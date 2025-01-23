import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://pokeapi.co/api/v2/';
const limit = 20;

export const getPokemonImage = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const getIdFromUrl = (url: string) => {
  return url.split('/')[6];
};

export const getPokemonList = async (page: number) => {
  try {
    const url = `${baseUrl}pokemon?limit=${limit}&offset=${limit * page}`;
    const pokemonList = await axios.get(url);
    if (pokemonList?.status === 200) {
      return pokemonList?.data;
    }
  } catch (error) {
    return error;
  }
};

export const getPokemonDetails = async (id: number) => {
  try {
    const url = `${baseUrl}pokemon/${id}`;
    const pokemonDetails = await axios.get(url);
    if (pokemonDetails?.status === 200) {
      return pokemonDetails?.data;
    }
  } catch (error) {
    return error;
  }
};

export const searchPokemonFromApi = async (name: string) => {
  try {
    const url = `${baseUrl}pokemon/${name.toLocaleLowerCase()}`;
    const pokemonDetails = await axios.get(url);
    if (pokemonDetails?.status === 200) {
      return pokemonDetails?.data;
    }
  } catch (error) {
    return error;
  }
};

export const addToFavorites = async (pokemon: object) => {
  console.log('🚀 ~ addToFavorites ~ pokemon:', pokemon);
  const favorites = await AsyncStorage.getItem('favorites');
  let parsedData = JSON.parse(favorites);
  console.log('🚀 ~ addToFavorites ~ parsedData:', parsedData);
  const newData = [...parsedData, pokemon];
  await AsyncStorage.setItem('favorites', JSON.stringify(newData));
};

export const checkIfItemPresent = async (pokemon: string) => {
  const favorites = JSON.parse(await AsyncStorage.getItem('favorites'));
  console.log('🚀 ~ checkIfItemPresent ~ favorites:', favorites);
  // const isPresent = favorites.find(item => item?.name === pokemon)
  // if (isPresent) {
  //     return true
  // }
  // return false
};

export const getFavoritesList = async () => {
  const favorites = await AsyncStorage.getItem('favorites');
  console.log('🚀 ~ getFavoritesList ~ favorites:', favorites);
  return favorites;
};
