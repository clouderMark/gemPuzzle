import variables from "./variables"

export function parseResults(arr) {
  if (localStorage.getItem('saved15results')) {
    let savedState = JSON.parse(localStorage.getItem('saved15results'))
    arr = savedState
    localStorage.removeItem('saved15results')
  }
  console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    let row = document.createElement('tr')
    let col1 = document.createElement('th')
    let col2 = document.createElement('th')
    let col3 = document.createElement('th')
    col1.textContent = arr[i].date
    col2.textContent = arr[i].moves
    col3.textContent = arr[i].time
    row.append(col1, col2, col3)
    game.tbody.append(row)
  }
}