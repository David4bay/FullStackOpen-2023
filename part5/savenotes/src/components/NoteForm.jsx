

const NoteForm = ({
    onSubmit,
    handleChange,
    value
}) => (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button type="submit">save</button>
    </form>  
  )

export default NoteForm