export function saveResults(arr, results) {
  arr = arr.map((item) => +(item.innerHTML))
  localStorage.setItem('saved15game', JSON.stringify(arr));
  localStorage.setItem('saved15results', JSON.stringify(results));
}