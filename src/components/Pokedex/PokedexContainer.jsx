import PokeCard from "./PokeCard";

const PokedexContainer = ({ forPage, pag, pokemons }) => {
  return (
    <div className="container_cards">
      {pokemons
        ?.slice((pag - 1) * forPage, (pag - 1) * forPage + forPage)
        .map((pokemon) => (
          <PokeCard key={pokemon.url} url={pokemon.url} />
        ))}
    </div>
  );
};

export default PokedexContainer;
