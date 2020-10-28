import React from 'react';
import {BtnBack, Logo} from '../components/index'
import './NotPage.scss'

const Page: React.FC = () => {
  return (
    <section className="not-page">
      <div>
        <Logo/>
        <h1>404</h1>
        <BtnBack/>
      </div>
    </section>
  )
}

export default Page;