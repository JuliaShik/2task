import React, {useState} from 'react';
import { InputText, Btn } from '../index'
import { useHistory, useLocation } from 'react-router-dom';

interface IProps {
  isAuth: Function
}

const LoiginForm: React.FC<IProps> = (props: IProps) => {
  const [login, setLogin] = useState<string>();
  const [pass, setPass] = useState<string>();
  const [code, setCode] = useState<string>();
  const [isErr, setIsErr] = useState<boolean>(false);
  const [form, setForm] = useState<string>('login');

  let history = useHistory();
  let location = useLocation();
  let { from }:any = location.state || { from: { pathname: "/" } };

  const SetLogin = (param: string) => {
    setLogin(param)
  }

  const SetPass = (param: string) => {
    setPass(param)
  }

  const SetCode = (param: string) => {
    setCode(param)
  }

  const Login = () => {
    if (login !== 'kode@kode.ru' && pass !== 'Enk0deng') {
      setIsErr(true)
    } else {
      setForm('code')
      alert('Код: 529384')
      setIsErr(false)
    }
  }

  function Code() {

    if (code !== '529384') {
      setIsErr(true)
    } else {
      props.isAuth();
      setIsErr(false)
      history.replace('/');
    }
  }

  let LoginForm = (
    <>
      <InputText
        id="login"
        text="Логин"
        type="text"
        data={SetLogin}/>
      <InputText
        id="pass"
        text="Пароль"
        type="password"
        data={SetPass}/>
      {
        (isErr) ?
          <p className="form-invalid">Неверный логин или пароль</p> :
          null
      }
      <Btn
        onClick={Login}
        className="btn btn-grad app-btn"
        text="next"/>
    </>
  )

  let CodeForm = (
    <>
    <InputText
        id="code"
        text="Код"
        type="code"
        data={SetCode}/>
      {
        (isErr) ?
          <p className="form-invalid">Неверный код</p> :
          null
      }
      <Btn
        onClick={Code}
        className="btn btn-grad app-btn"
        text="next"/>
    </>
  )

  return (
    <>
      {(form == 'login') ? LoginForm : null}
      {(form == 'code') ? CodeForm : null}
    </>
  )
}

export default LoiginForm;