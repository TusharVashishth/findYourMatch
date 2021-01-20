import { MESSAGE, CLEAR_MESSAGE } from "../actions/types"

const initialState = {
  messages: [],
  totalMessage: 0,
  skip: 0,
  limit: 0,
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.paylod],
      }
    // case TOTAL_MESSAGE:
    //   return {
    //     ...state,
    //     totalMessage: action.paylod,
    //   }
    // case SKIP:
    //   return {
    //     ...state,
    //     skip: action.paylod,
    //   }
    // case LIMIT:
    //   return {
    //     ...state,
    //     limit: action.paylod,
    //   }
    case CLEAR_MESSAGE:
      return {
        messages: [],
        skip: 0,
        limit: 0,
        totalMessage: 0,
      }
    default:
      return state
  }
}

export default messageReducer
