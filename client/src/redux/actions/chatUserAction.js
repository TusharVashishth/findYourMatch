import {
  storeFromUserUrl,
  storeToUserUrl,
  chatUserListUrl,
  messageUrl,
} from "../../helpers/urls"
import axios from "axios"
import {
  ERRORS,
  CHAT_USER_LIST,
  MESSAGE,
  TOTAL_MESSAGE,
  LIMIT,
  SKIP,
} from "./types"

export const storeToUser = (data) => (dispatch) => {
  axios
    .post(storeToUserUrl, data)
    .then(() => {})
    .catch((err) => dispatch({ type: ERRORS, paylod: err.response?.data }))
  return true
}

export const storeFromUser = (data) => (dispatch) => {
  axios
    .post(storeFromUserUrl, data)
    .then(() => console.log("Success"))
    .catch((err) => dispatch({ type: ERRORS, paylod: err.response?.data }))
}

export const list = (data) => (dispatch) => {
  axios
    .post(chatUserListUrl, data)
    .then((res) =>
      dispatch({
        type: CHAT_USER_LIST,
        paylod: res.data,
      })
    )
    .catch((err) => console.log(err))
}

export const getMessages = (skip, limit, toId, fromId) => (dispatch) => {
  axios
    .get(
      `${messageUrl}?skip=${skip}&limit=${limit}&toId=${toId}&fromId=${fromId}`
    )
    .then((res) => {
      dispatch({
        type: MESSAGE,
        paylod: res?.data?.messages,
      })
      dispatch({
        type: TOTAL_MESSAGE,
        paylod: res?.data?.totalMessages,
      })
      dispatch({
        type: LIMIT,
        paylod: res?.data?.limit,
      })
      dispatch({
        type: SKIP,
        paylod: res?.data?.skip,
      })
    })
    .catch((err) => console.log(err))
}
