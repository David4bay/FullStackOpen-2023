import { useSelector } from 'react-redux'

const AnecdoteList = ({anecdotes, vote}) => {

  let filteredAnecdotes = useSelector((state) => state.filter) 

  const input = document.getElementById('anecdotesFilter')

  console.log("anecdotes", anecdotes, "filteredAnecdotes", filteredAnecdotes)

  console.log("input", input?.value)


  if (filteredAnecdotes?.length > 0 && input?.value.length) {
    return (
      <>
      {filteredAnecdotes?.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </>
  )
  }

    return (
        <>
        {[...anecdotes]?.sort((a, b) => {
  if (a.votes < b.votes) {
    return 1
  }
  if (a.votes > b.votes) {
    return -1
  }
  return 0
}).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </>
    )
}

export default AnecdoteList