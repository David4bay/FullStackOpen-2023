const Notification = ({ message }) => {
  console.log("data from notification component", message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!message || message === '') return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
