import React from 'react'

const InsertEntry = ({ addNewPerson,
                       newName, setNewName,
                       newTel, setNewTel }) => {
  
  const formStyle = {
    display: 'grid',
    gridTemplateColumns: 'max-content max-content',
    gridGap: 5
  }

  const buttonStyle = {
    maxWidth: 100,
    marginTop: 5
  }

  const nameChange = (event) => setNewName(event.target.value)
  const telChange = (event) => setNewTel(event.target.value)
  
  return(
    <div>
      <h3>Add a new</h3>
      <form onSubmit={ addNewPerson }>
        <div style={ formStyle }>
          <label>Name:</label>
          <input id="newName" onChange={ nameChange } value={ newName } />
          <label>Number:</label>
          <input id="newTel" onChange={ telChange } value={ newTel } />
        </div>
        <button id="submitPerson" type="submit" style={ buttonStyle }>add</button>
      </form>
    </div>
  )
}

export default InsertEntry