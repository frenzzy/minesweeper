import { h } from 'hyperapp'
import s from './Input.module.css'

const Input = ({ key, id, type, name, value, maxLength, inputMode, onInput, onCreate }) => (
  <span class={s.root}>
    <input
      key={key}
      id={id}
      class={s.input}
      type={type || 'text'}
      name={name}
      value={value}
      maxlength={maxLength}
      inputmode={inputMode}
      oninput={onInput}
      oncreate={onCreate}
    />
  </span>
)

export default Input
