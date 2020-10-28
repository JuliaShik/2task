import React, { useState, useEffect } from 'react';
import './PokemonCard.scss'
import { Loader } from '../index'

interface IProps {
  match?: any
}

interface IPokemon {
  card: IPokemonCard
}

interface IDamage {
  damage: string,
  cost: Array<string>
}

interface IResistances {
  type: string,
  value: Array<string>
}
interface IPokemonCard {
  name: string,
  imageUrlHiRes?: string,
  types?: Array<string>,
  subtype: string,
  text: Array<string>,
  attacks?: Array<IDamage>,
  resistances?: Array<IResistances>,
  evolvesFrom?: string
}

const PokemonCard: React.FC<IProps> = (props: IProps) => {
  const [pokemon, setPokemon] = useState<IPokemon>()

  async function fn<T>(param: string): Promise<T> {
    try {
      let response = await fetch(`https://api.pokemontcg.io/v1/cards/${param}`);
      let data = response.json();
      return data;
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    fn<IPokemon>(props.match.params.pokemonId).then(data => { setPokemon(data)})
  }, []);

  return (
    (pokemon) ?
      <section className="pokemon-card">
        <div className="pokemon-card-col-l">
          <img
            onLoad={() => "../cat.png"}
            src={pokemon.card.imageUrlHiRes}
            alt={pokemon.card.name}
            className="pokemon-card-img"/>
          <div className="pokemon-card-text">
            { (pokemon.card.text) ?
                pokemon.card.text.map((item: string, index: number) =>
              <p key={index}>{item} </p>
            ) : <p>нет описания</p>
            }
          </div>
        </div>
        <div className="pokemon-card-col-r">
          <h3
            className="pokemon-card-name">
            {pokemon.card.name}
          </h3>
          <div className="pokemon-card-info">
            <p>Type:
              {
                (pokemon.card.types) ?
                  pokemon.card.types?.map((item: string, index: number) =>
                    <span className="pokemon-card-sub" key={index}>{item}</span>
                  )
                  :
                  <span className="pokemon-card-sub pokemon-card-sub_no">no</span>

              }
            </p>
            <p>Subtype:
              {
                (pokemon.card?.subtype) ?
                <span className="pokemon-card-sub">{pokemon.card?.subtype}</span>
                :
                <span className="pokemon-card-sub pokemon-card-sub_no">no</span>
              }
            </p>
            <hr/>
            <p>Attacks damage:
              {
                (pokemon.card.attacks) ?
                  pokemon.card.attacks?.map((item: IDamage, index: number) =>
                    <span
                      className="pokemon-card-label"
                      key={index}>
                      {item.damage}
                    </span>
                  ) :
                  <span className="pokemon-card-sub pokemon-card-sub_no">no</span>
              }
            </p>
            <p>Attacks cost:
              {
                (pokemon.card.attacks) ?
                  pokemon.card.attacks?.map((item: IDamage, index: number) =>
                    <span
                      className="pokemon-card-sub"
                      key={index}>
                      {item.cost.join(' ')}
                    </span>
                  ) :
                  <span className="pokemon-card-sub pokemon-card-sub_no">no</span>
              }
            </p>
            <p>Resistances:
              {
                (pokemon.card.resistances) ?
                  pokemon.card.resistances?.map((item: IResistances, index: number) =>
                    <span
                      className="pokemon-card-sub"
                      key={index}>
                      {item.type} / {item.value}
                    </span>
                  ) :
                  <span className="pokemon-card-sub pokemon-card-sub_no">no</span>
              }
            </p>
            <p>Evolves from:
              {
                (pokemon.card.evolvesFrom) ?
                    <span
                      className="pokemon-card-sub">
                      {pokemon.card.evolvesFrom}
                    </span>
                  :
                  <span className="pokemon-card-sub pokemon-card-sub_no">no</span>
              }
            </p>
          </div>
        </div>
      </section>
      : <Loader />
  )
}

export default PokemonCard;