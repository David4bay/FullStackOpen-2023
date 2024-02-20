import { useSelector } from "react-redux"

const Notification = () => {

  const message = useSelector((state) => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!message?.messageValue) return null

  return (
    <div style={style}>
      { message?.messageValue }
    </div>
  )
}

export default Notification