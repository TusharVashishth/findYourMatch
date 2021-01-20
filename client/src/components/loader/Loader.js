import React from "react"
import "./Loader.css"
import { Spinner } from "react-bootstrap"
const Loader = () => {
  return (
    <div className="loader">
      <Spinner animation="grow" variant="dark" />
      <h5>Loading..</h5>
    </div>
  )
}

export default Loader
