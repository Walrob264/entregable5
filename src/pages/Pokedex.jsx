import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import PokedexContainer from "../components/Pokedex/PokedexContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/Pokedex.css";
import Pagination from "../components/Pagination";
const Pokedex = () => {
  const [selectValue, setSelectValue] = useState("all-pokemons");
  const trainerName = useSelector((states) => states.trainerName);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0";
  const [pokemons, getAllPokemons, hasError, setPokemons] = useFetch(url);
  const urlTypes = "https://pokeapi.co/api/v2/type";
  const [types, getAllTypes] = useFetch(urlTypes);
  const [pag, setPag] = useState(1);
  const [max, setMax] = useState(0);

  const [forPage, setForPage] = useState(16);

  useEffect(() => {
    if (selectValue === "all-pokemons") {
      getAllPokemons();
    } else {
      axios
        .get(selectValue)
        .then((res) => {
          const data = {
            results: res.data.pokemon.map((pokeInfo) => pokeInfo.pokemon),
          };
          setPokemons(data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectValue]);
  useEffect(() => {
    setMax(Math.round(pokemons?.results.length / forPage));
  }, [pokemons]);

  useEffect(() => {
    getAllTypes();
  }, []);

  const searchPokemon = useRef();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = searchPokemon.current.value.trim().toLowerCase();
    navigate(`/pokedex/${inputValue}`);
  };
  const handleChangeType = (e) => {
    setSelectValue(e.target.value);
  };
  const handleHome = (e) => {
    e.preventDefault();
    navigate("/pokedex");
    setSelectValue("all-pokemons");
  };
  console.log(pokemons);
  return (
    <div className="containt_pokedex">
      <header className="header_pokemon">
        <div className="div_red-header">
          <div onClick={handleHome} className="Pokedex-image"></div>
        </div>
        <div className="div_black-header"></div>
        <div className="circle_header">
          <div className="circle_in-the-header"></div>
        </div>
      </header>
      <div className="containt_cards">
        <p className="text_for-welcome">
          Welcom <span className="name_trainer">{trainerName}</span>!, you cand
          find your favorite pokemon
        </p>
        <div className="containt_search">
          <form onSubmit={handleSubmit}>
            <input ref={searchPokemon} type="text" className="input_search" />
            <button className="button_search">Search</button>
          </form>
          <select onChange={handleChangeType} className="select_search">
            <option className="option_search" value="all-pokemons">
              All-pokemons
            </option>
            {types?.results.map((typeInfo) => (
              <option
                className="option_search"
                value={typeInfo.url}
                key={typeInfo.url}
              >
                {typeInfo.name}
              </option>
            ))}
          </select>
        </div>

        <PokedexContainer
          forPage={forPage}
          pag={pag}
          pokemons={pokemons?.results}
        />
      </div>
      <footer className="pagination">
        <Pagination pag={pag} setPag={setPag} max={max} />
      </footer>
    </div>
  );
};

export default Pokedex;
