import React, { useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import "./styles/Pokecard.css";
import { useNavigate } from "react-router-dom";
const PokeCard = ({ url }) => {
  const [pokemon, getPokemonById] = useFetch(url);

  const navigate = useNavigate();
  useEffect(() => {
    getPokemonById();
  }, []);
  const handleNavigate = () => {
    const namePokemon = pokemon?.name;
    navigate(`/pokedex/${namePokemon}`);
  };
  return (
    <article
      className={`pokecard ${pokemon?.types[0].type.name} `}
      onClick={handleNavigate}
    >
      <header className={`pokecard_header bg-${pokemon?.types[0].type.name}`}>
        <img
          className="pokecard_img"
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </header>
      <section className="pokecard_body">
        <h3 className="pokecard_name">{pokemon?.name}</h3>
        <ul className="pokecard_types">
          {pokemon?.types.map((typeInfo) => (
            <li className="pokecard_types-item" key={typeInfo.type.url}>
              {typeInfo.type.name}{" "}
            </li>
          ))}
        </ul>
        <footer className="pokecard_footer">
          <ul className="pokecard_stats">
            {pokemon?.stats.map((statInfo) => (
              <li key={statInfo.stat.url} className="pokecard__stats-item">
                <span className="pokecard__stats-label">
                  {statInfo.stat.name}
                </span>
                <span className="pokecard__stats-value">
                  {statInfo.base_stat}
                </span>
              </li>
            ))}
          </ul>
        </footer>
      </section>
    </article>
  );
};

export default PokeCard;
