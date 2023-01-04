export function drag(e) {
  e.dataTransfer.setData('inner', e.target.innerHTML)
}