import axios from 'axios'
const baseURL = "/api/persons"

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}


const addNew = async (newData) => {
  const response = await axios.post(baseURL, newData)
  return response.data
}

const updateEntry = async (changeID, newData) => {
  const updateURL = baseURL + "/" + changeID
  const response = await axios.put(updateURL, newData)
  return response.data
}

const removeEntry = async (deleteID) => {
  const delURL = baseURL + "/" + deleteID
  const response = await axios.delete(delURL)
  return response
}

export default { 
  getAll,
  addNew, 
  updateEntry, 
  removeEntry 
}