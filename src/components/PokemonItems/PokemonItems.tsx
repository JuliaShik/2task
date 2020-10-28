import React, {useState, useEffect} from 'react';
import './PokemonItems.scss'
import { Loader } from '../index'

type Props = {
  items: Array<any>,
  from: number,
  to: number,
  c: Function
}

interface IItem {
  id: string,
  imageUrlHiRes: string,
  name: string,
  subtype?: string,
  supertype: string
}

const PokemonItems: React.FC<Props> = (props: Props) => {
  const [mountItems, setMountItems] = useState<any>(props.items.slice(props.from, props.to));

  useEffect(() => {
    setMountItems(props.items.slice(props.from, props.to))
  }, [props.from]);

  if (mountItems) {
    return (
      <div className="pokemon-items">
        {
          mountItems.map((item: IItem) =>
            <div
              onClick={() => {props.c(item)}}
              className="pokemon-item"
              key={item.id}>
                <img
                  onLoad={() => "../cat.png"}
                  className="pokemon-item-img"
                  src={item.imageUrlHiRes}
                  alt={item.name}/>
                <h4
                  className="pokemon-item-name">
                  {item.name}
                </h4>
              <div className="pokemon-item-labels">
                {(item.subtype) ? <span className="pokemon-item-label">{item.subtype}</span> : ''}
                {(item.supertype) ? <span className="pokemon-item-label">{item.supertype}</span> : ''}
              </div>
            </div>
          )
        }
      </div>
    )
  }
  return (<Loader />)
}

export default PokemonItems;
