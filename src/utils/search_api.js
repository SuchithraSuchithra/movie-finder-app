import axios from 'axios'

export function fetchMoviesByTitleKeyword(keyword) {
  return axios.get(`/api/search/movie/${keyword}}`)
}

export function fetchPersonsByNameKeyword(keyword) {
  return axios.get(`/api/search/person/${keyword}}`)
}
