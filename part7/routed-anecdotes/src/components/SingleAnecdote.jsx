import { useParams } from "react-router-dom"

const SingleAnecdote = ({ anecdotes, anecdoteById }) => {

    const id = useParams().id
    
    let singleAnecdote = [...anecdotes]

    singleAnecdote = anecdotes.filter((anecdoteId) => Number(id) === anecdoteId.id)

    console.log("singleAnecdote", singleAnecdote)

    console.log("singleAnecdote", singleAnecdote)

    if (!singleAnecdote.length) return <h2>No such anecdote exists.</h2>

    return singleAnecdote?.map((uniqueAnecdote) => {
        return (
            <>
            <h2>{uniqueAnecdote.content} by {uniqueAnecdote.author}</h2>
            <p>
                has {uniqueAnecdote.votes} votes
            </p>
            <p>
                for  more info see <a href={uniqueAnecdote.info} target='_blank' rel='noopener noreferrer'>{uniqueAnecdote.info}</a>
            </p>
            </>
        )
    })
}
export default SingleAnecdote