import axios from 'axios'

export function fetchActors() {
  return axios.get('/api/actors')
}

// export function fetchMoviesByActorId(id) {
//   return axios.get(`/api/actors/${id}`)
// }
