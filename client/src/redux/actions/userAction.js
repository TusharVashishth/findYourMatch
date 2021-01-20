import {
  ERRORS,
  LOGIN_USER,
  GET_USERS,
  IS_LOADING,
  NOT_FOUND,
  GET_USER,
} from "./types"
import axios from "axios"
import setAxiosheader from "../../helpers/setAxiosHeader"
import {
  authUrl,
  updateProfile,
  findFriendsUrl,
  searchUserUrl,
  getUser,
} from "../../helpers/urls"
import jwtDecode from "jwt-decode"

export const signIn = (data, history) => (dispatch) => {
  axios
    .post(authUrl, data)
    .then((res) => {
      const { token } = res.data
      setAxiosheader(token)
      localStorage.setItem("findYourMatchToken", token)
      const decode = jwtDecode(token)
      dispatch({
        type: LOGIN_USER,
        paylod: decode?.data,
      })

      if (!decode?.data?.isProfile) {
        history.push({
          pathname: "/profile",
          state: { message: "Please update profile first" },
        })
      } else {
        history.push("/find-friends")
      }
    })
    .catch((err) => console.log(err))
}

export const updateUserProfile = (data, history) => (dispatch) => {
  axios
    .post(updateProfile, data)
    .then((res) => {
      history.push({
        pathname: "/find-friends",
        state: { message: res.data },
      })
    })
    .catch((err) =>
      dispatch({
        type: ERRORS,
        paylod: err.response?.data,
      })
    )
}

// * Getting Users list

export const getUsers = () => (dispatch) => {
  const token = localStorage.getItem("findYourMatchToken")
  const decode = jwtDecode(token)
  dispatch({
    type: IS_LOADING,
    paylod: true,
  })
  axios
    .post(findFriendsUrl, { id: decode?.data?.id })
    .then((res) => {
      dispatch({
        type: GET_USERS,
        paylod: res.data,
      })
      dispatch({
        type: IS_LOADING,
        paylod: false,
      })
    })
    .catch((err) => console.log(err))
}

// * search the user

export const searchUser = (data) => (dispatch) => {
  dispatch({
    type: IS_LOADING,
    paylod: true,
  })
  axios
    .post(searchUserUrl, data)
    .then((res) => {
      dispatch({
        type: GET_USERS,
        paylod: res.data,
      })
      dispatch({
        type: IS_LOADING,
        paylod: false,
      })
    })
    .catch(() => {
      dispatch({
        type: GET_USERS,
        paylod: [],
      })
      dispatch({
        type: NOT_FOUND,
        paylod: true,
      })
      dispatch({
        type: IS_LOADING,
        paylod: false,
      })
    })
}

// * Get User details

export const userDetails = (id) => (dispatch) => {
  axios
    .get(`${getUser}/?id=${id}`)
    .then((res) => {
      dispatch({
        type: GET_USER,
        paylod: res.data,
      })
    })
    .catch((err) => console.log(err))
}
