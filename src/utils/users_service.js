import axios from 'axios'

export function getUser() {
  const token = getToken()

  if (token) {
    return getPayload(token)
  } else {
    return null
  }
}

export function getToken() {
  const token = localStorage.getItem('token')
  if (token === null) return null

  const payload = getPayload(token)

  if (payload.exp < Date.now() / 1000) {
    // token has expired
    localStorage.removeItem('token')
    return null
  }

  return token
}

function getPayload(token) {
  return JSON.parse(window.atob(token.split('.')[1]))
}

export function verifyLoginCredentials(formData) {
  return axios.post('/api/user/login', formData)
}

export function createUser(formData) {
  return axios.post('/api/user/signup', formData)
}
