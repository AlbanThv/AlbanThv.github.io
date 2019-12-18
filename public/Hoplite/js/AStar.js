const AStar = {
    init: function (tilesList) {
        tilesList.forEach(cell => {
            if (cell) {
                cell.AStar_f = 0;
                cell.AStar_g = 0;
                cell.AStar_h = 0;
                cell.AStar_visited = false;
                cell.AStar_closed = cell.wall || cell.isOccupied;
                cell.AStar_debug = "";
                cell.AStar_parent = null;
            }
        });
    },
    search: function (map, start, end) {
        this.init(map.tilesList);

        let openList = [];

        // console.log(start, end)

        openList.push(start);

        while (openList.length > 0) {

            // Grab the lowest f(x) to process next
            let lowInd = 0;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].AStar_f < openList[lowInd].AStar_f) {
                    lowInd = i;
                }
            }
            let currentNode = openList[lowInd];

            // End case -- result has been found, return the traced path
            if (currentNode === end) {
                let curr = currentNode;
                let ret = [];
                while (curr.AStar_parent) {
                    ret.push(curr);
                    curr = curr.AStar_parent;
                }
                return ret.reverse();
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors
            openList.splice(lowInd, 1);
            currentNode.AStar_closed = true;

            let neighbors = this.neighbors(map, currentNode, start);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];

                if (neighbor.AStar_closed) { // not a valid node to process, skip to next neighbor
                    continue;
                }

                // g score is the shortest distance from start to current node, we need to check if
                //   the path we have arrived at this neighbor is the shortest one we have seen yet
                let gScore = currentNode.AStar_g + 1; // 1 is the distance from a node to it's neighbor
                let gScoreIsBest = false;

                if (!neighbor.AStar_visited) {
                    // This the the first time we have arrived at this node, it must be the best
                    // Also, we need to take the h (heuristic) score since we haven't done so yet
                    gScoreIsBest = true;
                    neighbor.AStar_h = this.heuristic(neighbor, end);
                    neighbor.AStar_visited = true;
                    openList.push(neighbor);
                } else if (gScore < neighbor.AStar_g) {
                    // We have already seen the node, but last time it had a worse g (distance from start)
                    gScoreIsBest = true;
                }

                if (gScoreIsBest) {
                    // Found an optimal (so far) path to this node.  Store info on how we got here and just how good it really is. ////
                    neighbor.AStar_parent = currentNode;
                    neighbor.AStar_g = gScore;
                    neighbor.AStar_f = neighbor.AStar_g + neighbor.AStar_h;
                    neighbor.AStar_debug = "F: " + neighbor.AStar_f + "<br />G: " + neighbor.AStar_g + "<br />H: " + neighbor.AStar_h;
                }
            }
        }

        // No result was found -- empty array signifies failure to find path
        return [];
    },

    heuristic: function (a, b) { //// heuristics : use manhattan distances  ////
        return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));
    },

    neighbors: function (map, tile, start) {
        let neighbourList = [];
        let neighbourCoords = [
            [1, 0, -1], [1, -1, 0], [0, -1, 1],
            [-1, 0, 1], [-1, 1, 0], [0, 1, -1]
        ];
        neighbourCoords.forEach(coords => {
            neighbourList.push(map.get(tile.x + coords[0], tile.y + coords[1], tile.z + coords[2]));
        });

        let index = neighbourList.length - 1;
        while (index >= 0) {
            if (neighbourList[index] === undefined) {
                neighbourList.splice(index, 1);
            }
            index--;
        }

        index = neighbourList.length - 1;
        while (index >= 0) {
            if (start !== neighbourList[index]) {
                if (!Map.isClean(neighbourList[index])) {
                    neighbourList.splice(index, 1);
                }
            }
            index--;
        }

        // index = neighbourList.length - 1;
        // while (index >= 0) {
        //     if (start !== neighbourList[index]) {
        //         if (neighbourList[index] === map.player.tile) {
        //             neighbourList.splice(index, 1);
        //         }
        //     }
        //     index--;
        // }

        return neighbourList;
    }
};

export default AStar;