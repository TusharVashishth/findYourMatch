import React, { useEffect } from "react"
import "./App.css"
import Routes from "./helpers/Routes"
import { useDispatch } from "react-redux"
import setAxiosheader from "./helpers/setAxiosHeader"
import jwtDecode from "jwt-decode"
import { LOGIN_USER } from "./redux/actions/types"

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("findYourMatchToken")
  useEffect(() => {
    if (token) {
      setAxiosheader(token)
      const decode = jwtDecode(token)
      dispatch({
        type: LOGIN_USER,
        paylod: decode?.data,
      })
    }
  }, [token, dispatch])
  return (
    <div className="app">
      <Routes />
    </div>
  )
}

export default App
