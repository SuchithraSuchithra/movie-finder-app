import axios from 'axios'

export function fetchMovieById(id) {
  return axios.get(`/api/movies/${id}`)
}

export function fetchUpcomingMovies() {
  return axios.get(`/api/movies/upcoming`)
}
