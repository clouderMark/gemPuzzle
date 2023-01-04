import { moving } from ".."

export function drop(e) {
  let clickGem = +(e.dataTransfer.getData('inner'))
  moving(clickGem)
}