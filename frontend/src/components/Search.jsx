import React from 'react'

const Search = ({ updateFunc }) => {
  const filterChange = (event) => updateFunc(event.target.value)

  return(
    <div>
      <p>filter shown with <input id="search" onChange={ filterChange } /></p>
    </div>
  )
}

export default Search