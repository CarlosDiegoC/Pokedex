const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail){
    const pokemon = new Pokemon();
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.number = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;
    pokemon.type = type;
    pokemon.types = types;
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;
    return pokemon
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json()
    .then(convertPokeApiDetailToPokemon));
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailsRequest) => Promise.all(detailsRequest))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
}