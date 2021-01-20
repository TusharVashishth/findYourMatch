import { combineReducers } from "redux"
import userReducer from "./userReducer"
import errorReducer from "./errorReducer"
import getUsersReducer from "./getUsersReducer"
import loaderReducer from "./loaderReducer"
import notFoundReducer from "./notFoundReducer"
import messageReducer from "./messageReducer"
import chatUserReducer from "./chatUserReducer"

export default combineReducers({
  user: userReducer,
  errors: errorReducer,
  getUsers: getUsersReducer,
  loading: loaderReducer,
  notFound: notFoundReducer,
  messages: messageReducer,
  chatUsers: chatUserReducer,
})
