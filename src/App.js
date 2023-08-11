import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import GenreListPage from './pages/GenreListPage'
import GenrePage from './pages/GenrePage'
import PersonListPage from './pages/PersonListPage'
import MoviePage from './pages/MoviePage'
import PersonPage from './pages/PersonPage'
import MovieSearchResultPage from './pages/MovieSearchResultPage'
import PersonSearchResultPage from './pages/PersonSearchResultPage'
import LogingPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { getUser } from './utils/users_service'
import { useState } from 'react'
import NavBar from './components/NavBar'
import { Box, useTheme, Grid } from '@mui/material'
import LoggedOutPage from './pages/LoggedOutPage'

function App() {
  const theme = useTheme()
  const [user, setUser] = useState(getUser())

  function login(user) {
    setUser(user)
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }
  return (
    <BrowserRouter>
      <div>
        <div>{user && <NavBar user={user} onLogOut={logout}></NavBar>}</div>
        <Box sx={{ height: theme.spacing(8) }}></Box>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Routes>
              {!user && (
                <>
                  <Route
                    exact
                    path='/login'
                    element={<LogingPage onLogin={login}></LogingPage>}
                  />
                  <Route
                    exact
                    path='/'
                    element={<LoggedOutPage></LoggedOutPage>}
                  />
                  <Route
                    exact
                    path='/signup'
                    element={<SignupPage></SignupPage>}
                  />
                  <Route path='*' element={<Navigate to='/login' />} />
                </>
              )}
              {user && (
                <>
                  <Route exact path='/login' element={<Navigate to='/' />} />
                  <Route exact path='/signup' element={<Navigate to='/' />} />
                  <Route exact path='/' element={<HomePage></HomePage>} />
                  <Route
                    exact
                    path='/persons'
                    element={<PersonListPage></PersonListPage>}
                  />
                  <Route
                    exact
                    path='/genres'
                    element={<GenreListPage></GenreListPage>}
                  />

                  <Route
                    exact
                    path='/persons/:id'
                    element={<PersonPage></PersonPage>}
                  />
                  <Route
                    exact
                    path='/genres/:id'
                    element={<GenrePage></GenrePage>}
                  />
                  <Route
                    exact
                    path='/movies/:id'
                    element={<MoviePage></MoviePage>}
                  />
                  <Route
                    exact
                    path='/search/movie/:keyword'
                    element={<MovieSearchResultPage></MovieSearchResultPage>}
                  />
                  <Route
                    exact
                    path='/search/person/:keyword'
                    element={<PersonSearchResultPage></PersonSearchResultPage>}
                  />
                  <Route element={<HomePage></HomePage>} />
                </>
              )}
            </Routes>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </BrowserRouter>
  )
}

export default App
