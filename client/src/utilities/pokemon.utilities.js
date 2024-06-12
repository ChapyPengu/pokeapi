export function getColorType(type) {
  return {
    fire: '#E72324',
    water: '#2481F0',
    bug: '#92A212',
    normal: '#A0A2A0',
    grass: '#3DA224',
    poison: '#923FCC',
    ground: '#92501B',
    fairy: '#EF71F0',
    fighting: '#FF8100',
    psychic: '#EF3F7A',
    ghost: '#713F71',
    rock: '#B0AB82',
    electric: '#FAC100',
    ice: '#3DD9FF',
    flying: '#82BAF0',
    dragon: '#4F60E2',
    dark: '#4F3F3D',
    steel: '#60A2B9'
  }[type] || '#000'
}