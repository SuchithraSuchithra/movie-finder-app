// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import * as UsersApi from '../utils/users_service'

// export default function LoginPage({ onLogin }) {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [error, setError] = useState('')

//   function handleChange(evt) {
//     console.log(evt.target.name)
//     setError('')
//     setFormData({ ...formData, [evt.target.name]: evt.target.value })
//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//     UsersApi.verifyLoginCredentials(formData)
//       .then((res) => {
//         localStorage.setItem('token', res.data)
//         onLogin(formData)
//         navigate(`/`)
//       })
//       .catch((err) => {
//         setError(err.response.data.message)
//       })
//   }

//   return (
//     <section className='login-page'>
//       <h1>login</h1>

//       {error && <p>{error}</p>}

//       <form action='' onSubmit={handleSubmit}>
//         <label htmlFor='email'>email</label>
//         <input onChange={handleChange} type='text' name='email' id='email' />

//         <label htmlFor='password'>password</label>
//         <input
//           onChange={handleChange}
//           type='password'
//           name='password'
//           id='password'
//         />
//         <button>login</button>
//       </form>
//     </section>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as UsersApi from '../utils/users_service'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './LoginPage.css'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://localhost:3001/'>
        MovieFinder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const defaultTheme = createTheme()

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    profilePath: '',
  })
  const [error, setError] = useState('')

  function handleChange(evt) {
    setError('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    UsersApi.verifyLoginCredentials({
      email: data.get('email'),
      password: data.get('password'),
    })
      .then((res) => {
        if (res.data.status === 'failure') {
          setError('Something went wrong.. Try Again!!')
        } else {
          localStorage.setItem('token', res.data)
          onLogin(formData)
          navigate(`/`)
        }
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <p className='erorr-message'>{error}</p>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <div className='login-container'>
              <Link className='login-link' href='/signup' variant='body2'>
                {'Not a member? Sign up'}
              </Link>
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
