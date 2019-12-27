export default function ImageLoader(sources, callback) {
    let images = {};
    let loadedImages = 0;
    let numImages = 0;
    let loadNumber = 0;

    // get num of sources
    for (let src in sources) {
        numImages++;
    }

    for (let src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            loadNumber++;

            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }

    if (loadNumber === Object.keys(sources).length) {
        return true;
    }
}