import { h } from 'hyperapp'
import s from './Winner.module.css'
import Dialog from './Dialog'
import Input from './Input'
import Button from './Button'

const Winner = ({ key, state, actions }) => (
  <Dialog key={key}>
    <form class={s.root} autocomplete="off" onsubmit={actions.submitBestTime}>
      <p class={s.text}>You have the fastest time for {state.level} level.</p>
      <p class={s.text}>Please enter your name.</p>
      <div class={s.input}>
        <Input
          type="text"
          name="winner"
          value={state.name}
          maxLength={32}
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
)

export default Winner
