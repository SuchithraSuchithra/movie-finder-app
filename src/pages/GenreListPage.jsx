import * as GenresApi from '../utils/genres_api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GenreListPage.css'

export default function GenreListPage() {
  const navigate = useNavigate()
  const [genreList, setGenreList] = useState([])

  useEffect(() => {
    GenresApi.fetchGenres().then((res) => {
      setGenreList(res.data.genres)
    })
  }, [])

  function handleClick(e) {
    e.preventDefault()
    navigate(`/genres/${e.target.getAttribute('data-value')}`)
  }

  return (
    <>
      <div className='sub-header'>Browse Genres</div>
      <div className='list-container'>
        {genreList.map(
          (movie) =>
            movie.posterPath && (
              <div className='item-container' key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                  alt={movie.name}
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
                    {movie.name}
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  )
}
