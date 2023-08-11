import axios from 'axios'

export function fetchGenres() {
  return axios.get('/api/genres')
}

export function fetchMoviesByGenreId(id) {
  return axios.get(`/api/genres/${id}`)
}
