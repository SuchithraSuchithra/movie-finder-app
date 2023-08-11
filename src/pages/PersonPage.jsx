import * as PersonsApi from '../utils/persons_api'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './PersonPage.css'
import { useNavigate } from 'react-router-dom'

function pick(obj, keysToKeep) {
  return Object.keys(obj)
    .filter((key) => keysToKeep.includes(key))
    .reduce((acc, key) => {
      if (obj[key]) {
        acc[key] = obj[key]
      }
      return acc
    }, {})
}
const personDetailsKeys = [
  'name',
  'birthday',
  'place_of_birth',
  'imdb_id',
  'known_for_department',
  'popularity',
]

export default function PersonPage() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [person, setPerson] = useState([])
  const [personBiography, setPersonBiography] = useState('')
  const [personName, setPersonName] = useState('')
  const [personProfilePath, setPersonProfilePath] = useState('')
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    PersonsApi.fetchPersonById(id).then((res) => {
      setPerson(pick(res.data, personDetailsKeys))
      setPersonProfilePath(res.data.profile_path)
      setPersonName(res.data.name)
      setPersonBiography(res.data.biography)
    })
    PersonsApi.fetchMoviesByPersonId(id).then((res) => {
      setMoviesList(res.data)
    })
  }, [id])

  function handleClick(e) {
    e.preventDefault()
    navigate(`/movies/${e.target.getAttribute('data-value')}`)
  }

  return (
    <>
      <h1 className='sub-header'>Person Details</h1>

      <div className='details-container'>
        <div className='movie-list-container first-column-content'>
          {person && (
            <div className='movie-item-container' key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${personProfilePath}`}
                alt={personName}
              />
              <div className='movie-title'>{personName}</div>
            </div>
          )}
        </div>
        <div className='second-column-content'>
          {Object.keys(person).map((key) => (
            <p>{key.replace(/_/g, ' ')}</p>
          ))}
        </div>
        <div className='third-column-content'>
          {Object.values(person).map((value) => (
            <p>{value}</p>
          ))}
        </div>
        <div className='combined-content'>{personBiography}</div>
      </div>

      <div></div>

      <div className='sub-header'>Related Movies</div>
      <div className='list-container'>
        {moviesList.map(
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
