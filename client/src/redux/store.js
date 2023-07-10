import { configureStore } from '@reduxjs/toolkit'
import messagesSlice from './message/messageSlice'

const store = configureStore({
  reducer: {
    message: messagesSlice,
  }
})

export default store