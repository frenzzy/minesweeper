import { h } from 'hyperapp'
import './app.css'
import Game from './Game'
import Winner from './Winner'
import BestTime from './BestTime'
import CustomField from './CustomField'

const levels = {
  beginner: {
    level: 'beginner',
    width: 9,
    height: 9,
    mines: 10,
  },
  intermediate: {
    level: 'intermediate',
    width: 16,
    height: 16,
    mines: 40,
  },
  expert: {
    level: 'expert',
    width: 30,
    height: 16,
    mines: 99,
  },
}

const levelNames = Object.keys(levels)

const createGame = ({ level, width, height, mines }) => {
  const field = new Array(height)
  for (let y = 0, m = mines; y < height; y++) {
    field[y] = new Array(width)
    for (let x = 0; x < width; x++, m--) {
      field[y][x] = {
        opened: false,
        mined: m > 0,
        flag: false,
        mark: false,
        num: 0,
      }
    }
  }
  return {
    level,
    width,
    height,
    mines,
    field,
    left: width * height - mines,
    pressed: false,
    pressedX: -1,
    pressedY: -1,
    group: false,
    flags: mines,
    start: -1,
    time: 0,
    raf: null,
    lose: false,
    win: false,
  }
}

const revealRange = (x, y, fn) =>
  fn(x - 1, y - 1) +
  fn(x - 1, y + 1) +
  fn(x + 1, y - 1) +
  fn(x + 1, y + 1) +
  fn(x - 1, y) +
  fn(x + 1, y) +
  fn(x, y - 1) +
  fn(x, y + 1)

const hasMarks = () => {
  if (typeof localStorage !== 'undefined') {
    const marks = localStorage.getItem('marks')
    if (marks != null) return Boolean(marks)
  }
  return true
}

export const state = {
  destroy: false,
  menu: null,
  game: createGame(levels.beginner),
  marks: hasMarks(),
  winner: null,
  bestTime: null,
  customField: null,
}

export const actions = {
  getState: () => (state) => state,
  destroy: () => ({ destroy: true }),
  reset: (payload) => ({ game }) => {
    cancelAnimationFrame(game.raf)
    const params = (payload && levels[payload.level]) || payload || game
    window.gtag('event', params.level === game.level ? 'reset' : 'level', {
      event_category: 'game',
      event_label: params.level,
    })
    return {
      menu: null,
      game: createGame(params),
    }
  },
  down: ({ event, x, y }) => ({ game, marks }, actions) => {
    if (event.button > 2 || game.win || game.lose) return null
    window.addEventListener('mouseup', function listener() {
      window.removeEventListener('mouseup', listener)
      actions.up()
    })
    let { field } = game
    let mines = game.flags
    if (!game.pressed && event.button === 2 && !field[y][x].opened) {
      field = field.slice()
      field[y] = field[y].slice()
      const prev = field[y][x]
      const next = {
        ...prev,
        flag: marks ? !prev.mark && !prev.flag : !prev.flag,
        mark: marks && prev.flag,
      }
      field[y][x] = next
      mines = prev.flag === next.flag ? game.flags : game.flags + (next.flag ? -1 : 1)
    }
    return {
      game: {
        ...game,
        field,
        pressed: event.button !== 2,
        pressedX: x,
        pressedY: y,
        group: event.shiftKey || event.buttons > 2,
        flags: mines,
      },
    }
  },
  move: ({ x, y }) => ({ game }) => ({
    game: { ...game, pressedX: x, pressedY: y },
  }),
  up: () => ({ game }, actions) => {
    const { width, height, pressedX, pressedY } = game
    if (game.win || game.lose || pressedX < 0 || pressedY < 0) {
      if (!game.pressed && !game.group) return null
      return { game: { ...game, pressed: false, group: false } }
    }
    const field = game.field.map((row) => row.map((c) => ({ ...c })))
    const outBounds = (x, y) => x < 0 || y < 0 || x >= width || y >= height
    const calcNear = (x, y, fn) => {
      let num = 0
      for (let offsetX = -1; offsetX <= 1; offsetX++) {
        for (let offsetY = -1; offsetY <= 1; offsetY++) {
          if (!outBounds(offsetX + x, offsetY + y)) {
            num += fn(field[offsetY + y][offsetX + x]) ? 1 : 0
          }
        }
      }
      return num
    }

    let { left, lose } = game
    const reveal = (x, y) => {
      if (outBounds(x, y)) return 0
      const c = field[y][x]
      if (c.opened || c.flag) return 0
      c.opened = true
      c.num = calcNear(x, y, (i) => i.mined)
      if (c.mined) lose = true
      if (c.num) return 1
      return revealRange(x, y, reveal) + 1
    }

    const begin = game.start < 0
    if (begin) {
      for (let i = height * width - 2; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const a = field[Math.floor(i / width)][i % width]
        const b = field[Math.floor(j / width)][j % width]
        const tmp = a.mined
        a.mined = b.mined
        b.mined = tmp
      }

      const a = field[height - 1][width - 1]
      const b = field[pressedY][pressedX]
      const tmp = a.mined
      a.mined = b.mined
      b.mined = tmp

      // eslint-disable-next-line no-param-reassign
      game.raf = requestAnimationFrame(actions.tick)

      window.gtag('event', 'start', {
        event_category: 'game',
        event_label: game.level,
      })
    }

    const cell = field[pressedY][pressedX]

    if (game.group) {
      if (cell.opened) {
        const flags = calcNear(pressedX, pressedY, (c) => c.flag)
        if (flags === cell.num) {
          left -= revealRange(pressedX, pressedY, reveal)
        }
      }
    } else if (game.pressed) {
      left -= reveal(pressedX, pressedY)
    }

    const win = left <= 0
    if (win || lose) {
      cancelAnimationFrame(game.raf)
      if (!lose) actions.win()
      window.gtag('event', lose ? 'lose' : 'win', {
        event_category: 'game',
        event_label: game.level,
        value: game.time,
      })
    }

    return {
      game: {
        ...game,
        left,
        field,
        pressed: false,
        group: false,
        start: begin ? performance.now() : game.start,
        time: begin ? 1 : game.time,
        lose,
        win,
      },
    }
  },
  tick: (now) => ({ game }, actions) => {
    // eslint-disable-next-line no-param-reassign
    game.raf = requestAnimationFrame(actions.tick)
    const next = Math.floor((now - game.start) / 1000) + 1
    if (game.time === next) return null
    return { game: { ...game, time: next } }
  },
  win: () => ({ game }) => {
    if (game.level === 'custom') return null
    const time = parseInt(localStorage.getItem(game.level), 10)
    if (time && time <= game.time) return null
    return {
      winner: {
        name: 'Anonymous',
        time: game.time,
        level: game.level,
      },
    }
  },
  changeWinner: (payload) => ({ winner }) => ({
    winner: { ...winner, ...payload },
  }),
  submitBestTime: (event) => ({ winner }, actions) => {
    event.preventDefault()
    localStorage.setItem(winner.level, winner.time)
    localStorage.setItem(`${winner.level}Name`, winner.name.trim())
    actions.toggleBestTime()
    return { winner: null }
  },
  toggleBestTime: () => ({ bestTime }) => ({
    menu: null,
    bestTime: bestTime
      ? null
      : {
          levels: levelNames.map((level) => ({
            level,
            name: localStorage.getItem(`${level}Name`) || 'Anonymous',
            time: Math.min(999, parseInt(localStorage.getItem(level), 10) || 0) || 999,
          })),
        },
  }),
  resetBestTime: () => ({
    bestTime: {
      levels: levelNames.map((level) => ({
        level,
        name: localStorage.removeItem(`${level}Name`) || 'Anonymous',
        time: localStorage.removeItem(level) || 999,
      })),
    },
  }),
  toggleCustomField: () => ({ game, customField }) => ({
    menu: null,
    customField: customField
      ? null
      : {
          width: String(game.width),
          height: String(game.height),
          mines: String(game.mines),
        },
  }),
  changeCustomField: (payload) => ({ customField }) => ({
    customField: { ...customField, ...payload },
  }),
  submitCustomField: (event) => ({ game, customField }, actions) => {
    event.preventDefault()
    const width = Math.max(9, Math.min(40, parseInt(customField.width, 10) || game.width))
    const height = Math.max(9, Math.min(30, parseInt(customField.height, 10) || game.height))
    const mines = parseInt(customField.mines, 10) || game.mines
    actions.reset({
      level: 'custom',
      width,
      height,
      mines: Math.max(10, Math.min(Math.floor(width * height * 0.8), mines)),
    })
    return { customField: null }
  },
  toggleMarks: () => (state) => {
    const marks = !state.marks
    localStorage.setItem('marks', marks ? 'yes' : '')
    return {
      menu: null,
      marks,
    }
  },
  toggleMenu: (event) => ({ menu }) => {
    const { name } = event.currentTarget.dataset
    if (event.type === 'click') {
      return { menu: menu && menu[name] ? null : { [name]: true } }
    }
    if (event.type === 'mouseenter') {
      return menu ? { menu: { [name]: true } } : null
    }
    if (event.type === 'focusout' && !event.currentTarget.contains(event.relatedTarget)) {
      return { menu: null }
    }
    return null
  },
}

export const view = (state, actions) => {
  if (state.destroy) return null
  return (
    <main>
      {state.game && <Game key="a" state={state} actions={actions} />}
      {state.winner && <Winner key="b" state={state.winner} actions={actions} />}
      {state.bestTime && <BestTime key="c" state={state.bestTime} actions={actions} />}
      {state.customField && <CustomField key="d" state={state.customField} actions={actions} />}
    </main>
  )
}
