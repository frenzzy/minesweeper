import { h } from 'hyperapp'
import s from './Dialog.module.css'
import Button from './Button'

const prevent = (event) => {
  event.preventDefault()
  return false
}

const Dialog = ({ key, title, onClose, onKeyDown }, children) => (
  <section
    key={key}
    class={s.root}
    tabindex={-1}
    oncontextmenu={prevent}
    ondragstart={prevent}
    onkeydown={onKeyDown}
  >
    <div class={s.table}>
      <div class={s.cell}>
        <div class={s.dialog}>
          <div class={s.container}>
            {title && (
              <div class={s.header}>
                <h1 class={s.title}>{title}</h1>
                {onClose && (
                  <div class={s.button}>
                    <Button tabIndex={-1} onClick={onClose}>
                      <svg class={s.close} width="13" height="11">
                        <path d="M10.977 2.406l-.883-.883L7 4.616 3.906 1.523l-.883.883L6.116 5.5 3.023 8.594l.883.883L7 6.384l3.094 3.093.883-.883L7.884 5.5l3.093-3.094z" />
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Dialog
