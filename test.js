fetch('https://pokeapi.co/api/v2/pokemon/')
  .then(res => console.log(res))
  .then(data => {
    console.log(data);
  })