import { IS_LOADING } from "../actions/types"

const initialState = {
  isLoading: false,
}

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        isLoading: action.paylod,
      }
    default:
      return state
  }
}

export default loaderReducer
