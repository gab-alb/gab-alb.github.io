const pokemonName = document.querySelector('.pokemon_name')
const pokemonID = document.querySelector('.pokemon_id')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const btnPrev = document.querySelector('.btn_prev')
const btnNext = document.querySelector('.btn_next')

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIResponse.status === 200) {
    const pokemonData = await APIResponse.json()
    return pokemonData
  }
}

const renderPokemon = async pokemon => {
  pokemonID.innerHTML = ''
  pokemonName.innerHTML = 'carregando...'

  const pokemonData = await fetchPokemon(pokemon)

  if (pokemonData) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = pokemonData.name
    pokemonID.innerHTML = pokemonData.id + ' - '
    pokemonImage.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    input.value = ''

    searchPokemon = pokemonData.id
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'não encontrado'
    pokemonID.innerHTML = ''
    input.value = ''
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  renderPokemon(input.value.toLowerCase())
})

btnPrev.addEventListener('click', () => {
  if (searchPokemon === 1) {
    return
  } else {
    searchPokemon = searchPokemon - 1
    renderPokemon(searchPokemon)
  }
})

btnNext.addEventListener('click', () => {
  searchPokemon = searchPokemon + 1
  renderPokemon(searchPokemon)
})

renderPokemon('1')
