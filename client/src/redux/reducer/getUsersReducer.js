import { GET_USERS } from "../actions/types"

const initialState = {
  data: {},
}

const getUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        data: action.paylod,
      }
    default:
      return state
  }
}

export default getUsersReducer
