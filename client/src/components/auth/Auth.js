import React from "react"
import { Modal } from "react-bootstrap"
import Logo from "../../assets/images/icon.png"
import Cross from "../../assets/images/cross.png"
import "./Auth.css"
import GoogleLogin from "react-google-login"
import { GOOGLE_CLIENT_ID } from "../../config/keys"
import { signIn } from "../../redux/actions/userAction"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
const Auth = ({ show, setShow }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const responseGoogle = (response) => {
    console.log(response)
    const data = {
      authId: response?.googleId,
      name: response?.profileObj?.name,
      email: response?.profileObj?.email,
      imageUrl: response?.profileObj?.imageUrl,
    }
    dispatch(signIn(data, history))
    setShow(false)
  }
  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body>
          <div className="auth">
            <img
              src={Cross}
              alt="cross"
              className="auth__cross"
              onClick={() => setShow(false)}
            />
            <div className="auth__logo d-flex">
              <img src={Logo} alt="logo" />
              <h2 className="mt-3 font-weight-bold">Get Started</h2>
              <small style={{ textAlign: "center" }}>
                Login or create an account with below options
              </small>
            </div>

            <div className="social__buttons">
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Auth
