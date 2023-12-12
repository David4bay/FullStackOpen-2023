/* eslint-disable react/prop-types */

const Persons = ({name, number, id, fetchedList, handleDeletedNumber}) => {
    return (
        <>
            <li>{name} {number} {fetchedList ? <button type="button" onClick={() => handleDeletedNumber(name, id)} >delete</button> : ''}</li>
        </>
    )
}

export default Persons