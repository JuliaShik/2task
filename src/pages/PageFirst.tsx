import React from 'react';
import './PageFirst.scss'
import '../scss/index.scss'

interface IProps {
  title?: string,
  children?: JSX.Element[] | JSX.Element | null
}

const PageFirst: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="page-first">
      <div className="page-first-wrapp">
        {
          (props.title) ?
          <h4
            className="page-first-title">
            { props.title }
          </h4> :
          null
        }
        { props.children }
      </div>
    </div>
  )
}

export default PageFirst;