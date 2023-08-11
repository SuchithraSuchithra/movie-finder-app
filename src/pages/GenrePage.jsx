import * as GenresApi from '../utils/genres_api'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './GenrePage.css'
import { useNavigate } from 'react-router-dom'

export default function GenrePage() {
  const navigate = useNavigate()
  let { id } = useParams()
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    GenresApi.fetchMoviesByGenreId(id).then((res) => {
      setMoviesList(res.data.results)
    })
  }, [id])

  function handleClick(e) {
    e.preventDefault()
    navigate(`/movies/${e.target.getAttribute('data-value')}`)
  }

  return (
    <>
      <h1 className='sub-header'>Movies</h1>
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
