import axios from 'axios'

export function fetchDirectors() {
  return axios.get('/api/directors')
}

// export function fetchDirectorById(id) {
//   return axios.get(`/api/directors/${id}`)
// }
