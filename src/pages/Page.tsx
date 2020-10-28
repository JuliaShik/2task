import React from 'react';
import {Header} from '../components/index'
import '../scss/index.scss'

interface IProps {
  isBack?: Boolean,
  logout: Function,
  children?: JSX.Element[] | JSX.Element | null
}

const Page: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Header
        logout={props.logout}
        isBack={props.isBack}/>
      { props.children }
    </>
  )
}

export default Page;