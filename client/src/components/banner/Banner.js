import React, { Fragment, useState } from "react"
import Auth from "../auth/Auth"
import "./Banner.css"
import Logo from "../../assets/images/icon.png"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Footer from "../footer/Footer"
const Banner = () => {
  const [show, setShow] = useState(false)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  return (
    <Fragment>
      <Auth show={show} setShow={setShow} />
      <div className="banner">
        <div className="banner__navbar">
          <h3 className="banner__brand">
            <img src={Logo} alt="logo" className="banner__logo" /> findYourMatch
          </h3>
          <button
            className="btn banner__loginButton"
            onClick={() => setShow(!show)}>
            Login
          </button>
        </div>

        <div className="banner__centerText">
          <h1>Start something new</h1>
          <div className="banner__buttons">
            {isAuthenticated ? (
              <Fragment>
                <Link to="/chat" className="banner__registerButton button link">
                  Go To Chat
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <button
                  className="banner__registerButton button "
                  onClick={() => setShow(!show)}>
                  Create account
                </button>
                <button
                  className="banner__loginButtonMobile  button"
                  onClick={() => setShow(!show)}>
                  Login
                </button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Banner
