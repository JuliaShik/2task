import React from 'react';
import './Modal.scss'

type Props = {
  content?: any,
  visibil: Boolean,
  close: Function,
  children?: JSX.Element[] | JSX.Element | null
}

const Modal: React.FC<Props> = (props: Props) => {
  const classes = ['modal'];

  const close = () => {
    props.close()
  }

  if (props.visibil) classes.push('modal_visibil')

  return (
    <div className={classes.join(' ')} onClick={close}>
      <div className="modal-block">
        <button
          onClick={close}
          className="modal-btn-close">
          <svg
            className="modal-btn-close__icon"
            viewBox="0 0 329.26933 329">
            <path
              d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844
              8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063
              0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063
              0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938
              128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094
              6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844
              128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0
              10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
          </svg>
        </button>
        { props.children }
      </div>
    </div>
  )
}

export default Modal;