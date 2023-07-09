import axios from "axios"
import { messageAction } from "../utility/constant"

const loadMessageList = (messageList) => {
    return {
        type: messageAction.LOAD_MESSAGE,
        payload: messageList
    }
}

const fetchMessageList = (groupId) =>  {
    return async (dispatch) => {
        const messageList = await axios.get(`http://localhost:3000/api/message?groupId=${groupId}`);
        dispatch(loadMessageList(messageList));
    }
}

export {
    loadMessageList,
    fetchMessageList
}