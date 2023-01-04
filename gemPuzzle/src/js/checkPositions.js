
function checkPositions(click, empty) {
  try {
    let distanceX = Math.abs(click.x - empty.x)
    let distanceY = Math.abs(click.y - empty.y)
    if (distanceX === 1 && distanceY === 0 || distanceX === 0 && distanceY === 1) {
      return true
    }
    return false
  } catch {}
}

export default checkPositions