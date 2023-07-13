try {
  // Realiza una solicitud GET a la API de Pokémon para obtener los primeros 150 pokémones
  const pokeApi = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150'
  )

  // Extrae las URL de cada pokémon de la respuesta de la API
  const pokeUrls = pokeApi.data.results.map((p) => p.url)

  // Realiza varias solicitudes concurrentes para obtener los datos de cada pokémon
  const pokeResponses = await Promise.all(pokeUrls.map(axios.get))

  // Procesa cada respuesta para extraer la información relevante de cada pokémon
  const pokeData = pokeResponses.map(({ data }) => {
    const { id, name, stats, height, weight, types, sprites } = data
    //Aca tenemos los datos que queremos ingresando al array stats y a los indices que necesitamos
    return {
      id,
      name,
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      speed: stats[5].base_stat,
      height,
      weight,
      types: types.map((t) => ({ name: t.type.name })),
      img: sprites.other.home.front_default
    }
  })

  // Devuelve los datos de los pokémones obtenidos
  return pokeData
} catch (error) {
  console.log(error)
  throw error
}
