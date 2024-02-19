import { useDispatch } from 'react-redux'
import { getState } from '../reducers/anecdoteReducer'
import { resetState } from '../reducers/anecdoteSlice'
import { filterNote } from '../reducers/filterReducer'
import { findContent } from '../reducers/filterSlice'

const AnecdotesFilter = () => {

    const dispatch = useDispatch()

    const handleFilter = (e) => {

        const {value} = e.target

        console.log(value)

        if (value.length < 1) {
            return dispatch(resetState())
        }

        dispatch(findContent(value))
    }

    return (
        <>
        <label htmlFor="anecdotesFilter">filter</label> <input onChange={handleFilter} type="text" name="anecdotesFilter" id="anecdotesFilter" />
        </>
    )
}

export default AnecdotesFilter