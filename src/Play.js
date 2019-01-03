import { h } from 'hyperapp'
import s from './Play.module.css'

const Smile = () => (
  <g>
    <circle cx="12" cy="7" r="1.5" />
    <circle cx="7" cy="7" r="1.5" />
    <path d="M13.779 11.1a.5.5 0 0 0-.7.1 4.455 4.455 0 0 1-7.158 0 .5.5 0 0 0-.8.6 5.455 5.455 0 0 0 8.752 0 .5.5 0 0 0-.094-.7z" />
  </g>
)

const Afraid = () => (
  <g>
    <circle cx="12.5" cy="6.5" r="1.5" />
    <circle cx="6.5" cy="6.5" r="1.5" />
    <path d="M9.5 10a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 9.5 10zm0 4a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 9.5 14z" />
  </g>
)

const Sunglasses = () => (
  <path d="M12.227 12.188a5.067 5.067 0 0 1-5.454 0 .5.5 0 0 0-.546.837 5.981 5.981 0 0 0 6.546 0 .5.5 0 1 0-.546-.837zm4.627-3.042l-3-3A.5.5 0 0 0 13.5 6h-8a.5.5 0 0 0-.354.146l-3 3a.5.5 0 0 0 .708.708L5 7.707V9a1 1 0 0 0 1 1h1a2 2 0 0 0 2-2V7h1v1a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1V7.707l2.146 2.147a.5.5 0 0 0 .708-.708z" />
)

const Sad = () => (
  <path d="M5.146 7.854a.5.5 0 0 0 .708 0l.646-.647.646.647a.5.5 0 0 0 .708-.708L7.207 6.5l.647-.646a.5.5 0 0 0-.708-.708l-.646.647-.646-.647a.5.5 0 0 0-.708.708l.647.646-.647.646a.5.5 0 0 0 0 .708zM13.207 6.5l.647-.646a.5.5 0 0 0-.708-.708l-.646.647-.646-.647a.5.5 0 0 0-.708.708l.647.646-.647.646a.5.5 0 0 0 .708.708l.646-.647.646.647a.5.5 0 0 0 .708-.708zM9.5 11a5.455 5.455 0 0 0-4.376 2.2.5.5 0 0 0 .8.6 4.455 4.455 0 0 1 7.158 0 .5.5 0 0 0 .8-.6A5.453 5.453 0 0 0 9.5 11z" />
)

const Face = ({ pressed, win, lose }) => {
  if (pressed) return <Afraid />
  if (lose) return <Sad />
  if (win) return <Sunglasses />
  return <Smile />
}

const Play = ({ pressed, lose, win, onReset }) => (
  <button
    class={s.root}
    type="button"
    tabindex={-1}
    onclick={() => onReset()}
    oncreate={(el) => el.focus()}
  >
    <svg class={s.face} width="19" height="19">
      <circle cx="9.5" cy="9.5" r="8.5" fill="#ff0" />
      <path d="M9.5 2A7.5 7.5 0 1 1 2 9.5 7.508 7.508 0 0 1 9.5 2m0-1A8.5 8.5 0 1 0 18 9.5 8.5 8.5 0 0 0 9.5 1z" />
      <g class={s.up}>
        <Face pressed={pressed} lose={lose} win={win} />
      </g>
      <g class={s.down}>
        <Smile />
      </g>
    </svg>
  </button>
)

export default Play
