const pokeBase = document.querySelector('#pokemons');
pokeBase.innerHTML = `
  <div class="loader">
    <img src="./assets/pokeballAnimated.gif" alt="Loading Gif" class="img-fluid loader__img" />
  </div>
`;

const fetchPokemon = () => {
  const promises = [];

  for (let i = 1; i <= 410; i++) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(URL).then( (res) => res.json()));
  }
  
  Promise.all(promises).then((results) => {
    const pokemon = results.map( (data) => ({
      name: data.name,
      weight: data.weight,
      height: data.height,
      id: data.id,
      exp: data.base_experience,
      type: data.types.map( type => type.type.name).join(' / '),
      abilities: data.abilities.map( ability => ability.ability.name).join(' / '),
      numberOfAbilities: data.abilities.length,
      spriteFront: data.sprites['front_default'],
      spriteBack: data.sprites['back_default'],
      avatar: data.sprites.other.dream_world['front_default']
    }))

    console.log(pokemon[0]);
    displayPokemon(pokemon);
  });      
}


const displayPokemon = (pokemon) => {

  const pokemon_template = pokemon.map(pokeman => `
    <div class="col-lg-4 col-md-6 col-xs-4 m-40">
      <div class="crd bg-light text-dark">
        <div class="crd__hdg">
          <img src="${pokeman.avatar}" class="crd__img" alt="Image test" />
        </div>
        <div class="crd__title">
          <h3 class="mb-0 fw-700">${pokeman.name}</h3>
        </div>
        <div class="crd__footer">
          <div class="crd__footer-item">
            <h2 class="mb-0 fw-700">${pokeman.weight}</h2>
            <p class="m-0 fw-300">Weight</p> 
          </div>
          <div class="crd__footer-item">
            <h2 class="mb-0 fw-700">${pokeman.height}</h2> 
            <p class="m-0 fw-300">Height</p>
          </div>
          <div class="crd__footer-item">
            <h2 class="mb-0 fw-700">${pokeman.exp}</h2>
            <p class="m-0 fw-300">Experience</p>
          </div>
        </div>
        <div class="crd__data">
          <div class="crd__data-pill">
            <p class="m-0 text-light">${pokeman.abilities}</p>
          </div>
          <div class="crd__data-pill">
            <p class="m-0 text-light">${pokeman.type}</p> 
          </div>
        </div>
      </div>
    </div>
  `).join('');

  pokeBase.innerHTML = pokemon_template;
};

fetchPokemon();
