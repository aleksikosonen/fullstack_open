const Info = ({ infoMessage }) => {
  if (infoMessage === null) {
    return null
  }

  return (
    <div>
      {infoMessage.includes('removed') || infoMessage.includes('failed') ? (
        <h2 className='message-error'>{infoMessage}</h2>
      ) : (
        <h2 className='message-success'>{infoMessage}</h2>
      )}
    </div>
  )
}

export default Info
