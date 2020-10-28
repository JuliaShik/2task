import React, { useState, useRef } from 'react';
import './Select.scss';

interface Options {
  id: number,
  value: string,
  text: string
}

interface Props {
  options: Array<Options>,
  text: string,
  f: Function
}

const Select: React.FC<Props> = (props: Props) => {
  const [text, setText] = useState<string>(props.text);
  const [textInput, setTextInput] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const btn = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const close = () => {
    setIsActive(false);
    setTextInput('')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTextInput(event.target.value)
  }

  const clickBtn = () => {
    if (isActive) {
      close()
    } else {
      setIsActive(true)
    }
  }

  document.addEventListener('click', {
    handleEvent(event) {
      if(isActive && event.target !== btn.current && event.target !== input.current && event.target !== content.current) {
        close()
      }
    }
  })
  
  const classes = ['select'];
  if (isActive) classes.push('select_open')

  return (
    <div className={classes.join(' ')}>
      <div
        ref={btn}
        className="select__btn"
        onClick={clickBtn}>
        <span
          onClick={clickBtn}
          className="select__val">
          {text}
        </span>
        <svg
          onClick={clickBtn}
          className="select__icon"
          viewBox="0 0 452 452">
          <g clip-path="url(#clip0)">
            {
              (isActive) ?
                <path
                  d="M225.924 97.141C234.022 97.141 242.119 100.233
                  248.293 106.404L442.577 300.69C454.936 313.049 454.936
                  333.087 442.577 345.441C430.223 357.795 410.189 357.795
                  397.829 345.441L225.924 173.526L54.0179 345.435C41.6589
                  357.789 21.627 357.789 9.27396 345.435C-3.09104 333.081
                  -3.09104 313.043 9.27396 300.684L203.555 106.398C209.732
                  100.226 217.829 97.141 225.924 97.141Z" />
              :
                <path
                  d="M225.923 354.706C217.825 354.706 209.728 351.614 203.554
                  345.443L9.27023 151.157C-3.08877 138.798 -3.08877 118.76 9.27023
                  106.406C21.6242 94.052 41.6582 94.052 54.0182 106.406L225.923
                  278.321L397.829 106.412C410.188 94.058 430.22 94.058 442.573
                  106.412C454.938 118.766 454.938 138.804 442.573 151.163L248.292
                  345.449C242.115 351.621 234.018 354.706 225.923 354.706Z" />
            }
          </g>
        </svg>
      </div>
      <div className="select__content" ref={content}>
      <input
        onChange={handleChange}
        value={textInput}
        ref={input}
        type="text"
        className="select__input"
        placeholder="Поиск"/>
        <div className="select__items">
        {
          props.options.map((item: any) =>
            (item.text.toLowerCase().indexOf(textInput.toLowerCase()) == 0) ?
            <div
              className="select__item"
              key={item.id}
              onClick={() => {
                setText(item.text);
                props.f(item.value);
                close()
              }}>
              {item.text}
            </div>
            : null
          )
        }
        </div>
      </div>
    </div>
  )
}

export default Select;