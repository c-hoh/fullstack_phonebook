import React from 'react'

const Phonebook = ({ persons, filter, deleteEntry }) => {
  let persons_to_show = persons
  if (filter.trim() !== '') {
    persons_to_show = persons.filter(x => 
      x.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const content = persons.length === 0 
    ? <p>No entries yet.</p>
    : persons_to_show.map(entry => 
        <p key={ entry.id }>
          { entry.name } { entry.number } {' '}
          <button onClick={ () => deleteEntry(entry.id) }>delete</button>
        </p> )

  return(
    <div>
      <h3>Numbers</h3>
      { content }
    </div>
  )
}

export default Phonebook