import { NOT_FOUND } from "../actions/types"

const initialState = {
  notFound: false,
}

const notFoundReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOT_FOUND:
      return {
        notFound: action.paylod,
      }
    default:
      return state
  }
}

export default notFoundReducer
