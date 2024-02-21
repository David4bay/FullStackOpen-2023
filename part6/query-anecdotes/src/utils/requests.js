import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const upvoteAnecdote = (anecdote) => {

    const id = anecdote.id

    const data = {...anecdote, votes: anecdote.votes + 1}

    return axios.put(`${baseUrl}/${id}`, data)
}

const addNewAnecdote = (anecdote) => {

    const data = { content: anecdote, id: getId(), votes: 0}

    return axios.post(baseUrl, data)
}

export {
    getAnecdotes,
    upvoteAnecdote,
    addNewAnecdote
}