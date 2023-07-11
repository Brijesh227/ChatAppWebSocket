import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  entities: [],
  status: null,
  err: ''
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (groupName) => {
  const response = await axios.get(`http://localhost:8000/api/message?groupName=${groupName}`)
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