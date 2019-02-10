import { h } from 'hyperapp'
import s from './Overlay.module.css'

const Overlay = ({ key, onKeyDown }, children) => (
  <section key={key} class={s.root} tabindex={-1} onkeydown={onKeyDown}>
    <div class={s.table}>
      <div class={s.cell}>{children}</div>
    </div>
  </section>
)

export default Overlay
