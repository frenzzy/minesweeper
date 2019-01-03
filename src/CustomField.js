import { h } from 'hyperapp'
import s from './CustomField.module.css'
import Dialog from './Dialog'
import Input from './Input'
import Button from './Button'

const CustomField = ({ key, state, actions }) => (
  <Dialog
    key={key}
    title="Custom Field"
    onClose={actions.toggleCustomField}
    onKeyDown={(event) => event.keyCode === 27 && actions.toggleCustomField()}
  >
    <form class={s.root} autocomplete="off" onsubmit={actions.submitCustomField}>
      <div>
        <label class={s.row}>
          <span class={s.name}>Height: </span>
          <span class={s.value}>
            <Input
              value={state.height}
              maxLength={5}
              onInput={(event) => actions.changeCustomField({ height: event.target.value })}
            />
          </span>
        </label>
        <label class={s.row}>
          <span class={s.name}>Width: </span>
          <span class={s.value}>
            <Input
              value={state.width}
              maxLength={5}
              onInput={(event) => actions.changeCustomField({ width: event.target.value })}
            />
          </span>
        </label>
        <label class={s.row}>
          <span class={s.name}>Mines: </span>
          <span class={s.value}>
            <Input
              value={state.mines}
              maxLength={5}
              onInput={(event) => actions.changeCustomField({ mines: event.target.value })}
            />
          </span>
        </label>
      </div>
      <div class={s.footer}>
        <Button onCreate={(el) => el.focus()}>
          <span class={s.button}>OK</span>
        </Button>
        <Button type="button" onClick={actions.toggleCustomField}>
          <span class={s.button}>Cancel</span>
        </Button>
      </div>
    </form>
  </Dialog>
)

export default CustomField
