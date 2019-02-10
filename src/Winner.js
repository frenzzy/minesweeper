import { h } from 'hyperapp'
import s from './Winner.module.css'
import Overlay from './Overlay'
import Dialog from './Dialog'
import Input from './Input'
import Button from './Button'

const Winner = ({ key, state, actions }) => (
  <Overlay key={key}>
    <Dialog>
      <form class={s.root} autocomplete="off" onsubmit={actions.submitBestTime}>
        <label for="winner" class={s.text}>
          You have the fastest time for {state.level} level.
        </label>
        <label for="winner" class={s.text}>
          Please enter your name.
        </label>
        <div class={s.input}>
          <Input
            id="winner"
            name="winner"
            value={state.name}
            maxLength={32}
            inputMode="latin-name"
            onInput={(event) => actions.changeWinner({ name: event.target.value })}
            onCreate={(input) => {
              input.focus()
              input.select()
            }}
          />
        </div>
        <Button>
          <span class={s.button}>OK</span>
        </Button>
      </form>
    </Dialog>
  </Overlay>
)

export default Winner
