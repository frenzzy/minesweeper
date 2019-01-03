import { h } from 'hyperapp'
import s from './Game.module.css'
import Dialog from './Dialog'
import Menu from './Menu'
import Digit from './Digit'
import Play from './Play'
import Cell from './Cell'

const Game = ({ key, state, actions }) => (
  <Dialog
    key={key}
    title="Minesweeper"
    onKeyDown={(event) => (event.keyCode === 113 || event.keyCode === 78) && actions.reset()}
  >
    <Menu state={state} actions={actions} />
    <div class={s.root}>
      <div class={s.scoreboard}>
        <Digit value={state.game.flags} />
        <Play
          pressed={state.game.pressed}
          lose={state.game.lose}
          win={state.game.win}
          onReset={actions.reset}
        />
        <Digit value={state.game.time} />
      </div>
      <div class={s.field}>
        {state.game.field.map((row, y) => (
          <div class={state.game.win || state.game.lose ? s.inactive : s.active}>
            {row.map((cell, x) => (
              <Cell
                x={x}
                y={y}
                pressed={state.game.pressed}
                pressedX={state.game.pressedX}
                pressedY={state.game.pressedY}
                group={state.game.group}
                opened={cell.opened}
                mined={cell.mined}
                flag={cell.flag}
                mark={cell.mark}
                num={cell.num}
                lose={state.game.lose}
                onDown={actions.down}
                onMove={actions.move}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </Dialog>
)

export default Game
