import { messageAction } from "../utility/constant"
const initialMessageState = {
  messageList: []
}

export const messageReducer = (messageStore = initialMessageState, action) => {
  switch (action.type) {
    case messageAction.LOAD_MESSAGE :
      return {
        ...messageStore,
        messageList: []
      }
    default:
      return messageStore
  }
}