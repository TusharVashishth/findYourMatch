import { LOGIN_USER, GET_USER } from "../actions/types"

const initialState = {
  isAuthenticated: false,
  data: {},
  userProfile: [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        isAuthenticated: true,
        data: action.paylod,
      }
    case GET_USER:
      return {
        ...state,
        userProfile: action.paylod,
      }
    default:
      return state
  }
}

export default authReducer
