import variables from "./variables";

let flag = true
export function soundToggle() {
  flag = !flag
  if (flag) {
    game.audio.src = './assets/silence.mp3'
  } else {
    game.audio.src = './assets/click.mp3'
  }
}