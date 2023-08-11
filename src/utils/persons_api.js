import axios from 'axios'

export function fetchPersonById(id) {
  return axios.get(`/api/persons/${id}`)
}

export function fetchMoviesByPersonId(id) {
  return axios.get(`/api/persons/${id}/movies`)
}
