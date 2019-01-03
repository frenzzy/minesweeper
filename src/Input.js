import { h } from 'hyperapp'
import s from './Input.module.css'

const Input = ({ key, type, name, value, maxLength, onInput, onCreate }) => (
  <span class={s.root}>
    <input
      key={key}
      class={s.input}
      type={type}
      name={name}
      value={value}
      maxlength={maxLength}
      oninput={onInput}
      oncreate={onCreate}
    />
  </span>
)

export default Input
