import React from 'react'

function ChatSelection() {

  return (
    <div>
      <form>
        <label>Enter your name:
          <input type="text" />
        </label>
        <label>Enter your groups
          <select>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
          </select>
        </label>
      </form>
    </div>
  )
}

export default ChatSelection