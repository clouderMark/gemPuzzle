export function ifSavedReturnState(arr) {
  let savedState = JSON.parse(localStorage.getItem('saved15game'))
  arr.sort((a, b) => savedState.indexOf(+(a.innerHTML)) - savedState.indexOf(+(b.innerHTML)))
  localStorage.removeItem('saved15game')
}