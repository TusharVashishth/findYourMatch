import React, { useEffect } from "react"
import { Modal, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { userDetails } from "../../redux/actions/userAction"
import { useHistory } from "react-router-dom"
const DisplayProfile = ({ show, handleClose }) => {
  const user = useSelector((state) => state?.user?.data)
  const profile = useSelector((state) => state?.user?.userProfile)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    if (user?.id && !profile) {
      dispatch(userDetails(user?.id))
    }
  }, [user, dispatch, profile])

  const handleEdit = () => {
    history.push({
      pathname: "/profile",
      state: { message: "Update Your profile", show: true },
    })
  }
  return (
    <div className="displayProfile">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              src={user?.image}
              className="rounded-circle w-25 h-25 mb-3"
              alt="user"
            />
          </div>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Name
              <span>{profile?.name}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Email
              <span>{profile?.email}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Age
              <span>{profile?.age}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Country
              <span>{profile?.country}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              State
              <span>{profile?.state}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              City
              <span>{profile?.city}</span>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleEdit}>
            Edit Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DisplayProfile
