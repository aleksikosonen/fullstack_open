const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {message.includes('wrong') || message.includes('error') ? (
        <h2 className='message-error'>{message}</h2>
      ) : (
        <h2 className='message-success'>{message}</h2>
      )}
    </div>
  )
}

export default Notification
