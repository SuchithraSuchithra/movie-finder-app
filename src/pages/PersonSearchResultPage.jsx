import * as SearchApi from '../utils/search_api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './PersonSearchResultPage.css'
import Alert from '@mui/lab/Alert'
import Typography from '@mui/material/Typography'

export default function PersonSearchResultPage() {
  const navigate = useNavigate()
  const [personList, setPersonList] = useState(undefined)

  let { keyword } = useParams()

  useEffect(() => {
    SearchApi.fetchPersonsByNameKeyword(keyword).then((res) => {
      setPersonList(res.data.results)
    })
  }, [keyword])

  function handleClick(e) {
    e.preventDefault()
    navigate(`/persons/${e.target.getAttribute('data-value')}`)
  }

  return (
    <>
      {personList === undefined ? (
        false
      ) : (
        <>
          {personList?.length === 0 ? (
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
              <h1 className='sub-header'>Person Search Results</h1>
              <div className='list-container'>
                {personList.map(
                  (person) =>
                    person.profile_path && (
                      <div className='item-container' key={person.id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                          alt={person.name}
                          data-value={person.id}
                          onClick={handleClick}
                        />
                        <div>
                          <button
                            className='title-button-medium'
                            value={person.id}
                            data-value={person.id}
                            onClick={handleClick}
                          >
                            {person.name}
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
