const pokemonList = document.getElementById('pokemonList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let offset = 0;
let limit = 12;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
                <li class="pokemon ${pokemon.type}">
                    <div class="nameAndNumber">
                        <span class="name">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                    </div>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.img}" alt="${pokemon.name}">
                    </div>
                </li>
        `
        ).join('');

        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItems(offset, limit);

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    if(offset == 144) {
        limit = 7;
        loadMoreBtn.parentElement.removeChild(loadMoreBtn);
    } 
    loadPokemonItems(offset, limit)
})
