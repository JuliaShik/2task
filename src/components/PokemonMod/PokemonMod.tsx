import React from 'react';
import { Btn } from '../index'
import { Link } from 'react-router-dom';
import './PokemonMod.scss'

interface Props {
  data: IPokemon | null
}

interface IPokemon {
  imageUrl: string,
  name: string,
  id: string,
  text: Array<string>
}


const PokemonMod: React.FC<Props> = (props: Props) => {
  return (
    <div className="pokemon-mod">
      <div className="pokemon-mod-col-l">
        <img
          onLoad={() => "../cat.png"}
          className="pokemon-mod-img"
          src={props.data?.imageUrl}
          alt={props.data?.name}/>
      </div>
      <div className="pokemon-mod-col-r">
        <h4
          className="pokemon-mod-name">
          {props.data?.name}
        </h4>
        <div className="pokemon-mod-text">
            { (props.data?.text) ?
                props.data?.text.map((item: string, index: number) =>
              <p key={index}>{item} </p>
            ) : <p>нет описания</p>
            }
          </div>
        <Link to={`/pokemon/${props.data?.id}`}>
          <Btn text="More" className="btn btn-grad"/>
        </Link>
      </div>
    </div>
  )
}

export default PokemonMod;

