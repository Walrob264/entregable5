import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./style/PokedexName.css";
const PokedexName = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const [pokemon, getPokemonByName, hasError] = useFetch(url);
  console.log(pokemon);
  useEffect(() => {
    getPokemonByName();
  }, [name]);
  const handleHome = (e) => {
    e.preventDefault();
    navigate("/pokedex");
  };

  return (
    <div>
      <header className="header_pokemon-Name">
        <div className="div_red-header">
          <div onClick={handleHome} className="Pokedex-image"></div>
        </div>
        <div className="div_black-header"></div>
        <div className="circle_header">
          <div className="circle_in-the-header"></div>
        </div>
      </header>
      {hasError ? (
        <h1>
          ✖️ The Pokemon "<span>{name}</span>" doens't exit
        </h1>
      ) : (
        <>
          <div className="Contain_card-info">
            <header className={`header_card bg-${pokemon?.types[0].type.name}`}>
              <img
                className="img-pokemon"
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </header>
            <div className="id_pokemon">
              <h1>#{pokemon?.id}</h1>
            </div>
            <div className="containt_title-pokemon">
              <hr />
              <h2 className="name_pokemon">{pokemon?.name}</h2>
              <hr />
            </div>

            <div className="containt_info-pokemon">
              <div className="containt_weight-pokemon">
                <span>weight</span>
                <span>{pokemon?.weight}</span>
              </div>
              <div className="containt_height-pokemon">
                <span>height</span>
                <span>{pokemon?.height}</span>
              </div>
            </div>
            <div className="containt_type-info">
              <div className="typeInfo-pokemon">
                <h2 className="type_title">Type</h2>
                <div>
                  <ul className="ul_types-pokemon ">
                    {pokemon?.types.map((typeInfo) => (
                      <li
                        className={`types-${pokemon?.types[0].type.name}`}
                        key={typeInfo.type.url}
                      >
                        {typeInfo.type.name}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="abalitiesInfo-pokemon">
                <h2 className="abilities_title">Ablities</h2>
                <ul className="ul_abalities-pokemon">
                  {pokemon?.abilities.map((ablilitesInfo) => (
                    <li key={ablilitesInfo.ability.url}>
                      {ablilitesInfo.ability.name}{" "}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="containt_stats-pokemon"></div>
            </div>
            <div className="containt_statInfo-pokemon">
              <div className="header_statInfo">
                <h1>Stats</h1> <hr />{" "}
                <div className="containt_pokeball-stats">
                  <div className="pokeball-stats"></div>
                  <div className="circle_center"></div>
                  <div className="pokeball-stats-2"></div>
                </div>
              </div>
              <div>
                {pokemon?.stats.map((statInfo) => (
                  <div className="stat_pokemon" key={statInfo.stat.url}>
                    <div className="statInfo-pokemon">
                      <span>
                        <p>{statInfo.stat.name}</p>
                      </span>
                      <span> {statInfo["base_stat"]} /150 </span>
                    </div>
                    <div className="containt_bar-stats">
                      <div
                        className="bar_stats"
                        style={{
                          display: "inline-block",
                          width: `calc((100%* ${statInfo["base_stat"]})/150)`,
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="containt_movements-pokemon">
            <div className="containt_title-movements">
              <h1 className="movements_title">Movements</h1>
              <hr />
              <div className="containt_pokeball-stats">
                <div className="pokeball-stats"></div>
                <div className="circle_center"></div>
                <div className="pokeball-stats-2"></div>
              </div>
            </div>
            <div className="move_pokemon">
              {pokemon?.moves.slice(0, 20).map((moveInfo) => (
                <div className="contain_movements" key={moveInfo.move.url}>
                  {" "}
                  <h3>{moveInfo.move.name}</h3>{" "}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokedexName;
