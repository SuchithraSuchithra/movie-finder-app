import * as SearchApi from '../utils/search_api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MovieSearchResultPage.css'

export default function MovieSearchResultPage() {
  const navigate = useNavigate()
  const [movieList, setMovieList] = useState([])

  let { keyword } = useParams()

  useEffect(() => {
    SearchApi.fetchMoviesByTitleKeyword(keyword).then((res) => {
      setMovieList(res.data.results)
    })
  }, [keyword])

  function handleClick(e) {
    e.preventDefault()
    navigate(`/movies/${e.target.getAttribute('data-value')}`)
  }

  return (
    <>
      <h1 className='sub-header'>Movie Search Results</h1>
      <div className='list-container'>
        {movieList.map(
          (movie) =>
            movie.poster_path && (
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
            )
        )}
      </div>
    </>
  )
}
