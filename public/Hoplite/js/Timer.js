export default class Timer {
    constructor(deltaTime = 1 / 60) {
      let accumulatedTime = 0;
      let lastTime = 0;
      let lastCalledTime = performance.now();
      let fps = 0;

      this.updrateProxy = (time) => {
        accumulatedTime += (time - lastTime) / 1000;

        if (accumulatedTime > 1) { accumulatedTime = 1; }

        while (accumulatedTime > deltaTime) {
          this.update(deltaTime);
          accumulatedTime -= deltaTime;
        }
        lastTime = time;

        this.enqueue();
      }
    }

    enqueue() {
        let delta = (performance.now() - this.lastCalledTime)/1000;
        this.lastCalledTime = performance.now();
        this.fps = 1/delta;
        // console.log(this.fps)
      requestAnimationFrame(this.updrateProxy);
    }

    start() {
      this.enqueue();
    }
  }