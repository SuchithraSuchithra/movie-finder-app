import * as MoviesApi from '../utils/movies_api'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VisitorNavBar from '../components/VisitorNavBar'

export default function LoggedOutPage() {
  const navigate = useNavigate()
  let { id } = useParams()
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    MoviesApi.fetchUpcomingMovies(id).then((res) => {
      setMoviesList(res.data.results)
    })
  }, [id])

  function handleClick(e) {
    e.preventDefault()
    navigate(`/movies/${e.target.getAttribute('data-value')}`)
  }

  return (
    <>
      <VisitorNavBar></VisitorNavBar>
      <h1 className='sub-header'>Upcoming Movies</h1>
      <div className='list-container'>
        {moviesList &&
          moviesList.length > 0 &&
          moviesList.map((movie) => (
            <div className='item-container' key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                data-value={movie.id}
                onClick={handleClick}
              />
              <div>
                <button
                  className='title-button-medium'
                  value={movie.id}
                  data-value={movie.id}
                  onClick={handleClick}
                >
                  {movie.title}
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
