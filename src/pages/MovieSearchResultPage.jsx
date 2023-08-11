import * as SearchApi from '../utils/search_api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './MovieSearchResultPage.css'
import Alert from '@mui/lab/Alert'
import Typography from '@mui/material/Typography'

export default function MovieSearchResultPage() {
  const navigate = useNavigate()
  const [movieList, setMovieList] = useState(undefined)

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
      {movieList === undefined ? (
        false
      ) : (
        <>
          {movieList?.length === 0 ? (
            <div className='error-banner'>
              <Alert severity='error' icon={false} style={{ color: 'red' }}>
                <Typography variant='h6'>
                  Sorry, we couldn't find any results matching {keyword}. Search
                  again..
                </Typography>
              </Alert>
            </div>
          ) : (
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
          )}
        </>
      )}
    </>
  )
}
