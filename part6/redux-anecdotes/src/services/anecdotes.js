import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (anecdote) => {
    const newNote = {
        content: anecdote,
        id: getId(),
        votes: 0
    }

    const response = await axios.post(baseUrl, newNote)

    return response.data
}

const upVote = async (anecdote, id) => {

    const newAnecdote = {
        ...anecdote, votes: anecdote.votes + 1
    }

    const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)

    return response.data
}

export default {
    getAll,
    createNew,
    upVote
}