import React from 'react';
import './ChatSelection.css'

function ChatSelection({ setGroupName, setUsername, handleSubmit }) {
  return (
    <div className="chatSelection">
      <form onSubmit={handleSubmit}>
        <div className='margin'>
          <label>Enter your name:
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className='margin'>
          <label>Enter your group:
            <select name="group" onChange={(e) => setGroupName(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
            </select>
          </label>
        </div>
        <div className='margin'>
          <button type='submit'> Join group </button>
        </div>
      </form>
    </div>
  )
}

export default ChatSelection