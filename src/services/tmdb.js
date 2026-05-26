import axios from 'axios';

const API_KEY = '7d3d8b70c9e385737385d695896d859e';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export const getTrending = async (type = 'all') => {
  const { data } = await tmdbApi.get(`/trending/${type}/week`);
  return data.results;
};

export const getMovies = async () => {
  const { data } = await tmdbApi.get('/discover/movie');
  return data.results;
};

export const getSeries = async () => {
  const { data } = await tmdbApi.get('/discover/tv');
  return data.results;
};

export default tmdbApi;