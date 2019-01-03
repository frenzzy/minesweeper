import { h } from 'hyperapp'
import s from './Digit.module.css'

const Digit = ({ value }) => (
  <div class={s.root}>
    {`00${Math.max(-99, Math.min(999, value))}`
      .slice(-3)
      .split('')
      .sort((a) => (a === '-' ? -1 : 0))
      .map((digit) => (
        <svg class={s.digit} width="13" height="23" data-n={digit}>
          <path class={s.t} d="M1.5 1l3 3h4l3-3h-10z" />
          <path class={s.rt} d="M12 1.5l-3 3v4l3 3v-10z" />
          <path class={s.rb} d="M12 11.5l-3 3v4l3 3v-10z" />
          <path class={s.b} d="M11.5 22l-3-3h-4l-3 3h10z" />
          <path class={s.lb} d="M1 21.5l3-3v-4l-3-3v10z" />
          <path class={s.lt} d="M1 1.5v10l3-3v-4l-3-3z" />
          <path class={s.m} d="M8.5 13h-4L3 11.5 4.5 10h4l1.5 1.5L8.5 13z" />
        </svg>
      ))}
  </div>
)

export default Digit
