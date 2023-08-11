import * as MoviesApi from '../utils/movies_api'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './MoviePage.css'

function pick(obj, keysToKeep) {
  return Object.keys(obj)
    .filter((key) => keysToKeep.includes(key))
    .reduce((acc, key) => {
      if (obj[key]) {
        acc[key] = obj[key]
      }
      if (key === 'genres') {
        acc[key] = obj[key].map((genre) => genre['name'] + ' ')
      }

      return acc
    }, {})
}
const movieDetailsKeys = [
  'title',
  'genres',
  'homepage',
  'tagline',
  'original_language',
  'original_title',
  'release_date',
  'revenue',
  'status',
  'vote_average',
  'vote_count',
  'popularity',
  'revenue',
  'budget',
]

export default function MoviePage() {
  let { id } = useParams()
  const [movie, setMovie] = useState({})
  const [movieOverview, setMovieOverview] = useState('')
  const [movieTitle, setMovieTitle] = useState('')
  const [moviePosterPath, setMoviePosterPath] = useState('')

  useEffect(() => {
    MoviesApi.fetchMovieById(id).then((res) => {
      setMovieOverview(res.data.overview)
      setMovieTitle(res.data.title)
      setMoviePosterPath(res.data.poster_path)
      setMovie(pick(res.data, movieDetailsKeys))
    })
  }, [id])

  return (
    <>
      <h1 className='sub-header'>Movie Details</h1>
      <div className='details-container'>
        <div className='movie-list-container first-column-content'>
          {movie && (
            <div className='movie-item-container' key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${moviePosterPath}`}
                alt={movieTitle}
              />
              <div className='movie-title'>{movieTitle}</div>
            </div>
          )}
        </div>
        <div className='second-column-content'>
          {Object.keys(movie).map((key) => (
            <p>
              {(key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g, ' ')}
            </p>
          ))}
        </div>
        <div className='third-column-content'>
          {Object.values(movie).map((value) => (
            <p>{value}</p>
          ))}
        </div>
        <div className='combined-content'>{movieOverview}</div>
      </div>
    </>
  )
}
