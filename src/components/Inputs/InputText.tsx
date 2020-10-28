import React, {useState, useEffect} from 'react';

interface Props {
  text: string,
  val?: string,
  id: string,
  data?: Function,
  type?: string
}

const InputText: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState<string>(props.val!);

  useEffect(() => {
    if (props.data) {
      props.data(value)
    }
  }, [value])

  return (
    <div className={`input-text ${(value) ? 'input-text_val' : ''}`}>
      <input
        id={props.id}
        type={props.type}
        onChange={(e) => {setValue(e.target.value)}}/>
      <label
        htmlFor={props.id}>
        {props.text}
      </label>
    </div>
  )
}

export default InputText;