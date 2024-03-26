import React from 'react'

import './index.css'

const Search = ({search, setSearch, onChangeCity, handleSearch}) => {
  return (
    <div className='search-container'>
      <input 
        type='text'
        placeholder='Enter City Name...'
        name='search'
        value={search}
        onChange={setSearch}
      />
      <button onClick={handleSearch}>Search Weather</button>
    </div>
  )
}

export default Search