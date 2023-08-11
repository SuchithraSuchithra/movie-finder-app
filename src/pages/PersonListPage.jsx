import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PersonListPage.css'

export default function PersonListPage() {
  const navigate = useNavigate()
  const [searchBy, setSearchBy] = useState('')

  function handleSerachBy(e) {
    setSearchBy(e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/search/person/${searchBy}`)
    setSearchBy('')
  }

  return (
    <>
      <h1 className='sub-header'>Search Cast/Crew..</h1>
      <div className='search-container'>
        <input
          type='text'
          name='search'
          value={searchBy}
          onChange={handleSerachBy}
          className='search-container-items'
        />

        <button onClick={handleSearch} className='search-container-items'>
          Submit
        </button>
      </div>
    </>
  )
}
