import React from 'react';
import { BtnBack } from '../index'
import './header.scss';
import { useHistory } from "react-router-dom";

interface IProps {
  isBack?: Boolean,
  logout: Function
}

const Header: React.FC<IProps> = (props: IProps) => {
  const history = useHistory();

  return (
    <header className="header">
      {
        (props.isBack) ? <BtnBack/> : null
      }
      <button
        onClick={() => props.logout()}
        className="btn header-btn-logout">
        logout
      </button>
    </header>
  );
}

export default Header;
