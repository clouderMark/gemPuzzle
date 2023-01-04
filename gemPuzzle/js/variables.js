window.game = {
  root: document.body,
  puzzle: document.createElement('div'),

  navigation: document.createElement('div'),
  shuffle: document.createElement('button'),
  stop: document.createElement('button'),
  save: document.createElement('button'),
  results: document.createElement('button'),

  moves: document.createElement('div'),
  time: document.createElement('div'),
  info: document.createElement('div'),
  size: 16,
  gems() { return Array.from(game.puzzle.querySelectorAll('.gem')) },
  timer: undefined,
  audio: document.createElement('audio'),
  audioToggle: document.createElement('button'),
  mask: document.createElement('div'),
  youWon: document.createElement('div'),
  resultsTable: document.createElement('table'),
  tbody: document.createElement('tbody'),
  resultsList: [
    {
      date: 'Date:',
      moves: 'Amount mooves:',
      time: 'Time:',
    }
  ],
  gameSizes: document.createElement('div'),
  radios() {return Array.from(document.getElementsByClassName('radio'))}
}

export default window.game