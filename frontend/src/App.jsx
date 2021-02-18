import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import InsertEntry from './components/InsertEntry'
import Search from './components/Search'
import Notification from './components/Notification'
import phonebookService from './services/entries'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newTel, setNewTel ] = useState('')
  const [ notificationMsg, setNotificationsMsg ] = useState(null)
  const [ msgStyle, setMsgStyle ] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(personData => {
        setPersons(personData)
      })
  }, [])

  const displayMessage = (msg, type) => {
    setMsgStyle(type)
    setNotificationsMsg(msg)
    setTimeout(() => {
      setNotificationsMsg(null)
      setMsgStyle(null)
    }, 5000)
  }

  const dataEntryError = (error_msg) => {
    const name_regex = RegExp('name.+shorter')
    const num_regex = RegExp('number.+shorter')

    if (name_regex.test(error_msg)) {
      displayMessage('The name must be at least 3 characters long.', 'err')
    } else if (num_regex.test(error_msg)) {
      displayMessage('The phone number must be at last 8 digits long.', 
                     'err')
    } else {
      // show a generic error if we managed to come here
      displayMessage('Something went wrong when saving the data.', 'err')
    }
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const isKnown = persons.map(x => 
      x.name.toLowerCase()).includes(newName.toLowerCase())
    if (isKnown) {
      const updateMsg = `${ newName } is already in the phonebook, replace ` +
                         `the old number with the new one?`
      const shouldUpdate = window.confirm(updateMsg)
      if (shouldUpdate) {
        const existingData = persons.find(
          x => x.name.toLowerCase() === newName.toLowerCase())
        changeEntry(existingData, newTel)
      }
    } else {
      const newEntry = {
        name: newName,
        number: newTel
      }
      
      phonebookService
        .addNew(newEntry)
        .then(addedEntry => {
          setPersons(persons.concat(addedEntry))
          setNewName('')
          setNewTel('')
          displayMessage(`Added ${ newName }`, 'msg')
      })
      .catch(error => {
        const error_msg = error.response.data["error"]
        dataEntryError(error_msg)
      })
    }
  }

  const deleteEntry = (id) => {
    const deleteEntry = persons.find(x => x.id === id)
    const deleteMsg = `Delete ${ deleteEntry.name }?`
    const decision = window.confirm(deleteMsg)

    if (decision) {
      phonebookService
        .removeEntry(id)
        .then(deletedData => {
          const justDeleted = deletedData.config[0]
          const personsNow = persons.filter(x => x.id !== justDeleted)
          setPersons(personsNow)
          displayMessage(`Removed ${ deleteEntry.name }`, 'msg')
        })
    }
  }

  const changeEntry = (oldData, newNumber) => {
    const changedData = { ...oldData, number: newNumber }
    
    phonebookService
      .updateEntry(changedData.id, changedData)
      .then(newData => {
        const newPersons = persons.map(x => x.id === newData.id ? newData : x)
        setPersons(newPersons)
        setNewName('')
        setNewTel('')
        displayMessage(`Updated information of ${ changedData.name }.`, 'msg')
      })
      .catch(error => {
        const error_msg = error.response.data["error"]
        if (error_msg !== undefined) {
          dataEntryError(error_msg)
        } else {
          displayMessage(`Information of ${ changedData.name } has ` +
                         `already been removed from the server.`, 'err')
        }
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search updateFunc={ setFilter } />
      <Notification msg={ notificationMsg } type={ msgStyle } />
      <InsertEntry addNewPerson={ addNewPerson } 
                   newName={ newName } setNewName={ setNewName }
                   newTel={ newTel } setNewTel={ setNewTel } />
      <Phonebook persons={ persons } filter={ filter } 
                 deleteEntry={ deleteEntry }/>
    </div>
  )
}

export default App