import axios from 'axios'
const baseURL = `http://localhost:3001/persons`

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (newNumberDetail) => {
    const request = axios.post(baseURL, newNumberDetail)
    return request.then(response => response.data)
}

const replace = (newNumberDetail, id) => {
    const request = axios.put(`${baseURL}/${id}`, newNumberDetail)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    replace,
    deleteNumber
}