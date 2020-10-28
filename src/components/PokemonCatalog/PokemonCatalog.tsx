import React, { useState, useEffect } from 'react';
import { Select, PokemonItems, Pagination, Loader, Modal, PokemonMod } from '../index';

interface Pokemon {
  cards: Array<any>
}

const PokemonCatalog: React.FC = () => {
  const pokemonsItemsNum = 4;
  const [params, setParams] = useState<string>('');
  const [pokemons, setPokemons] = useState<Pokemon | null>(null);
  const [pokemonDataMod, setPokemonDataMod] = useState<any | null>(null);
  const [isMod, setIsMod] = useState<Boolean>(false)
  const [pokemonsItemsFrom, setPokemonsItemsFrom] = useState<number>(0)
  const [pokemonsItemsTo, setPokemonsItemsTo] = useState<number>(pokemonsItemsNum)

  const options = [
    {id: 1, value: '?subtype=Basic', text: 'Basic'},
    {id: 2, value: '?subtype=Stage%201', text: 'Stage 1'},
    {id: 3, value: '?subtype=Stage%202', text: 'Stage 2'},
    {id: 4, value: '?subtype=Pok%C3%A9mon%20Tool', text: 'Pokemon Tool'},
    {id: 5, value: '?subtype=Special', text: 'Special'},
    {id: 6, value: '?subtype=Restored', text: 'Restored'},
    {id: 7, value: '?subtype=Item', text: 'Item'},
    {id: 8, value: '?subtype=Stadium', text: 'Stadium'},
    {id: 9, value: '?subtype=GX', text: 'GX'},
    {id: 10, value: '?subtype=Break', text: 'Break'},
    {id: 11, value: '?subtype=Legend', text: 'Legend'},
    {id: 12, value: '', text: 'All'}
  ]

  async function fn<T>(param: string): Promise<T> {
    try {
      let response = await fetch(`https://api.pokemontcg.io/v1/cards${param}`);
      let data = response.json();
      return data;
    } catch (err) {
      throw new Error(err)
    }
  }

  const clickHendlerItem = (item: any) => {
    setIsMod(true)
    setPokemonDataMod(item)
    console.log(item)
  }

  const closeMod = () => {
    setIsMod(false)
  }

  const f = (param: string) => {
    setParams(param);
  }

  const pokemonsItems = (from: number, to: number) => {
    setPokemonsItemsFrom(from);
    setPokemonsItemsTo(to);
  }

  useEffect(() => {
    setPokemons(null);
    fn<Pokemon>(params).then(data => { setPokemons(data)})
  }, [params]);

  return (
    <>
      <div className="content">
        <div className="content-bar">
          <Select
            options={options}
            text="Выбрать тип"
            f={f}/>
        </div>
        <div className="content-wrapp">
          {pokemons ?
            <>
              <PokemonItems
                items={pokemons.cards}
                from={pokemonsItemsFrom}
                to={pokemonsItemsTo}
                c={clickHendlerItem}/>
              <Pagination
                count={pokemonsItemsNum}
                length={pokemons.cards.length}
                output={pokemonsItems}/>
            </>:
            <Loader />}
        </div>
      </div>
      <Modal
        visibil={isMod}
        content={PokemonMod}
        close={closeMod}>
        <PokemonMod data={pokemonDataMod}/>
      </Modal>
    </>
  )
}

export default PokemonCatalog;