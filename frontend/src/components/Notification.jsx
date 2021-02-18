import React from 'react'

const Notification = ({ msg, type }) => {
  const msgStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (msg !== null && type === 'msg') {
    return(<div style={ msgStyle }>{ msg }</div>)
  } else if (msg !== null && type === 'err') {
    return(<div style={ errStyle }>{ msg }</div>)
  } else {
    // avoid displaying things if things are not clear
    return(null)
  }
}

export default Notification