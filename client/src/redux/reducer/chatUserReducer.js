import { CHAT_USER_LIST, CHAT_USER } from "../actions/types"

const initialState = {
  data: [],
  chatUser: {},
}

const chatUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_USER_LIST:
      return {
        data: action.paylod,
      }
    case CHAT_USER:
      return {
        ...state,
        chatUser: action.paylod,
      }
    default:
      return state
  }
}

export default chatUserReducer
