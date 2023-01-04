import '@/styles/index.scss'
// import variables from './js/variables'
import createMatrix from './js/createMatrix'
import mix from './js/mix'
import findPosition from './js/findPosition'
import checkPositions from './js/checkPositions'
import { arrangeGems } from './js/arrangeGems'
import { shift } from './js/shift'
import { gameStop } from './js/gameStop'
import { soundToggle } from './js/soundToggle'
import { rightShuffle } from './js/rightShuffle'
import { saveResults } from './js/saveResults'
import { ifSavedReturnState } from './js/ifSavedReturnState'
import { parseResults } from './js/parseResults'
import { addResult } from './js/addResult'
import { allowDrop } from './js/allowDrop'
import { drag } from './js/drag'
import { drop } from './js/drop'

let amoutMooves = 0
let seconds = 0
let minutes = 0
let size = game.size


game.puzzle.classList.add('puzzle')
game.navigation.classList.add('navigation')
game.shuffle.textContent = 'Shuffle and start'
game.stop.textContent = 'Stop'
game.save.textContent = 'Save'
game.results.textContent = 'Results'

game.info.classList.add('info')
game.moves.textContent = `Moves: ${amoutMooves}`
game.time.textContent = `Time: ${minutes} : ${seconds}`

game.audioToggle.classList.add('audioToggle')
game.mask.classList.add('mask')
game.youWon.classList.add('youWon')

game.resultsTable.classList.add('resultsTable')
game.gameSizes.classList.add('gameSizes')
game.gameSizes.textContent = 'Other sizes: '

for (let i = 3; i < 9; i++) {
  const label = document.createElement('label')
  const radio = document.createElement('input')
  const span = document.createElement('span')
  radio.setAttribute('type', 'radio')
  radio.setAttribute('name', 'size')
  if (i === 4) {
    radio.checked = true
  }
  radio.classList.add('radio', `radio--${i}`, 'visually-hidden')
  label.classList.add('radio-label')
  span.textContent = `${i} x ${i}`
  label.append(radio, span)
  game.gameSizes.append(label)
}

soundToggle()

createGems(size)

game.root.append(game.navigation, game.info, game.puzzle, game.gameSizes, game.audio, game.audioToggle, game.youWon, game.mask, game.resultsTable)
game.navigation.append(game.shuffle, game.stop, game.save, game.results,)
game.info.append(game.moves, game.time,)
game.resultsTable.append(game.tbody)


let gems = game.gems()
const radios = game.radios()
let timer

if (localStorage.getItem('saved15game')) {
  ifSavedReturnState(gems)
} else {
  rightShuffle(gems)
}

let matrix = createMatrix(
  gems.map((item) => +(item.innerHTML))
)
arrangeGems(matrix, gems)

game.shuffle.addEventListener('click', () => {
  counterStart()
  rightShuffle(gems)
  matrix = createMatrix(
    gems.map((item) => +(item.innerHTML))
  )
  arrangeGems(matrix, gems)

  seconds = -1
  minutes = 0
  amoutMooves = 0

  gameStop(amoutMooves)

  if (gems[0].classList.contains('animation')) {
    gems.map((i) => i.classList.remove('animation'))
  }
})
game.puzzle.addEventListener('click', (e) => {
  let clickGem = +(e.target.textContent)
  moving(clickGem)
})

game.stop.addEventListener('click', () => {
  if (amoutMooves > 0 || seconds > 0 || minutes > 0) {

    if (game.stop.innerHTML === 'Stop') {
      game.stop.textContent = 'Start'
      clearInterval(timer)
    } else {
      game.stop.textContent = 'Stop'
      seconds = seconds
      minutes = minutes
      counterStart()
    }
    game.stop.classList.toggle('button--stop')
  }
})

game.audioToggle.addEventListener('click', () => {
  soundToggle()
  game.audioToggle.classList.toggle('audioToggle--off')
})

game.save.addEventListener('click', () => {
  saveResults(gems, game.resultsList)
})

game.results.addEventListener('click', () => {
  game.mask.classList.add('mask--open')
  game.resultsTable.classList.add('resultsTable--open')
  parseResults(game.resultsList)
})

game.mask.addEventListener('click', () => {
  game.mask.classList.remove('mask--open')
  game.youWon.classList.remove('youWon--open')
  game.resultsTable.classList.remove('resultsTable--open')
  game.tbody.replaceChildren()
})

for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener('change', () => {
    game.size = (i + 3) * (i + 3)
    game.puzzle.replaceChildren()

    createGems(game.size)
    let gems = game.gems()
    mix(gems)
    matrix = createMatrix(
      gems.map((item) => +(item.innerHTML))
    )
    arrangeGems(matrix, gems)
    console.log('Ммм,да...Это тот прикол который не удалось реализовать. При смене размера листенер на доске остается в начальном окружении. Не понял как в него прокинуть перетасованную матрицу')
  })
}

function counterStart() {
  if (timer) {
    clearInterval(timer)
  }
  timer = setInterval(go, 1000)

  function go() {
    seconds++
    if (seconds === 60) {
      minutes++
      seconds = 0
    }
    game.time.textContent = `Time: ${minutes} : ${seconds}`
  }
}

function isWinner(matrix) {
  const winArr = []
  for (let i = 1; i <= size; i++) {
    winArr.push(i)
  }

  if (process()) {
    game.mask.classList.add('mask--open')
    game.youWon.textContent = `Hooray! You solved the puzzle in ${minutes}:${seconds} and ${amoutMooves} moves!`
    game.youWon.classList.add('youWon--open')
    clearInterval(timer)
    addResult(minutes, seconds, amoutMooves)
  }

  function process() {
    let gameArr = matrix.flat()
    for (let i = 0; i < size; i++) {
      if (winArr[i] !== gameArr[i]) return false
    }
    return true
  }
}

function createGems(size) {
  for (let i = 1; i <= size; i++) {
    const gem = document.createElement('div')
    gem.classList.add('gem', `gem--${Math.sqrt(size)}`)
    gem.textContent = i
    if (i === size) {
      gem.classList.add('gem--d-none')
    }
    gem.addEventListener('dragstart', drag, false)
    if (i < size) {
      gem.setAttribute('draggable', true)
    } else {
      gem.addEventListener('dragover', allowDrop, false)
      gem.addEventListener('drop', drop, false)
    }

    game.puzzle.append(gem)
  }
}

export function moving(clickGem) {
  let clickGemPosition = findPosition(clickGem, matrix)
  let emptyGemPosition = findPosition(game.size, matrix)

  let isValid = checkPositions(clickGemPosition, emptyGemPosition)
  if (isValid) {

    shift(clickGemPosition, emptyGemPosition, gems)
    matrix = createMatrix(
      gems.map((item) => +(item.innerHTML))
    )
    arrangeGems(matrix, gems)
    counterStart()
    amoutMooves++
    gameStop(amoutMooves)
    game.audio.play()
    isWinner(matrix)
  }
  if (!gems[0].classList.contains('animation')) {
    gems.map((i) => i.classList.add('animation'))
  }
}
