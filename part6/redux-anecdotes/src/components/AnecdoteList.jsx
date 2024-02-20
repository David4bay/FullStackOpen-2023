import { useSelector } from 'react-redux'

const AnecdoteList = ({vote}) => {

  let filteredAnecdotes = useSelector((state) => state.filter)
  
  let anecdotes = useSelector(state => state.anecdotes)

  const input = document.getElementById('anecdotesFilter')

  if (filteredAnecdotes?.length > 0 && input?.value.length) {
    return (
      <>
      {filteredAnecdotes?.sort((a, b) => {
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

    return (
        <>
        {Array.from(anecdotes)?.sort((a, b) => {
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