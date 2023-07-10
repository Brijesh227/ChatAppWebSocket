import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  entities: [],
  status: null,
  err: ''
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => { //groupId
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos') //http://localhost:3000/api/message?groupId=${groupId} 
  return response.data;
})

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.entities = action.payload
        state.status = 'idle'
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'error'
        state.err = action.error.message
      })
  }
})

export default messagesSlice.reducer