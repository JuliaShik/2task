import React from 'react';
import './Btn.scss';
import { useHistory } from "react-router-dom";

const BtnBack: React.FC = () => {
  const history = useHistory();

  return (
    <button
      className="btn-back"
      onClick={ () => { history.goBack() } }>
      <svg
        className="btn-back__icon"
        viewBox="0 0 258 452">
        <path d="M0.141052 225.923C0.141052 217.825 3.23305 209.728 9.40405 203.554L203.69
        9.27C216.049 -3.089 236.087 -3.089 248.441 9.27C260.795 21.624 260.795 41.658 248.441
        54.018L76.526 225.923L248.435 397.829C260.789 410.188 260.789 430.22 248.435
        442.573C236.081 454.938 216.043 454.938 203.684 442.573L9.39804 248.292C3.22604
        242.115 0.141052 234.018 0.141052 225.923Z"/>
      </svg>
      Back
    </button>
  );
}

export default BtnBack;
