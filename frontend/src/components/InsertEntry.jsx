import React from 'react'

const InsertEntry = ({ addNewPerson,
                       newName, setNewName,
                       newTel, setNewTel }) => {
  
  const nameChange = (event) => setNewName(event.target.value)
  const telChange = (event) => setNewTel(event.target.value)
  
  return(
    <div>
      <h3>Add a new</h3>
      <form onSubmit={ addNewPerson }>
        <div>
          <p>name: <input id="newName" onChange={ nameChange } value={ newName } /></p>
          <p>number: <input id="newTel" onChange={ telChange } value={ newTel } /></p>
        </div>
        <div>
          <button id="submitPerson" type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default InsertEntry