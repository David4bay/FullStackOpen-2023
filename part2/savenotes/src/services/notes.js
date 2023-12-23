import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
const liveUrl = import.meta.env.VITE_LIVE_URL

const getAll = () => {
  const request = axios.get(liveUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}