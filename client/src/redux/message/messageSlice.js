import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    entities: [],
    status: null
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (groupId) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1') //http://localhost:3000/api/message?groupId=${groupId} 
  console.log("res",response)
  return response.json()
})

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const newEntities = {}
        console.log("action pa",action.payload)
        action.payload.forEach(message => {
          newEntities[message.id] = message
        })
        state.entities = newEntities
        state.status = 'idle'
      })
  }
})
