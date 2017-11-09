import Keyboard from "./KeyboardState.js";

export function setupKeyboard(entity) {
  const input = new Keyboard();

  input.addMapping("Space", keyState => {
    if (keyState) {
      entity.jump.start();
    } else {
      entity.jump.cancel();
    }
  });

  input.addMapping("ArrowRight", keyState => {
    // right
    entity.go.dir = keyState;
  });

  input.addMapping("ArrowLeft", keyState => {
    // left
    entity.go.dir = -keyState;
  });

  return input;
}
