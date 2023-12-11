/* eslint-disable react/prop-types */

const PersonForm = ({handleSubmit, newName, handleNumberChange, newPhoneNumber, handleTextChange}) => {
    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" name="name" value={newName} onChange={handleTextChange} autoComplete="true" required />
        </div>
        <div>number: <input type="text" name="phoneNumber" value={newPhoneNumber} onChange={handleNumberChange} pattern="[\d{1,3}-\d{1,3}-\d{1,7}]" required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm