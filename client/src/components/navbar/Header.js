import React, { useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import DisplayProfile from "../../pages/userProfile/DisplayProfile"
function Header() {
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  return (
    <div>
      <DisplayProfile show={show} handleClose={handleClose} />
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/" className="text-dark text-decoration-none">
            FindFriend
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => setShow(true)}>Profile</Nav.Link>
            <Nav.Link>
              <Link to="/chat" className="text-dark text-decoration-none">
                Chats
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
