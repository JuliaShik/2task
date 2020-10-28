import React from 'react';

interface Props {
  className?: string,
  text: string,
  onClick?: any,
  type?: "button" | "submit" | "reset" | undefined
}

const Btn: React.FC<Props> = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={props.className}>
      {props.text}
    </button>
  )
}

export default Btn;