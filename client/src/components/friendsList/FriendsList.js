import React, { useEffect } from "react"
import "./FriendsList.css"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../redux/actions/userAction"
import { storeToUser, storeFromUser } from "../../redux/actions/chatUserAction"
import Loader from "../loader/Loader"
import NotFound from "../../assets/images/notFound.png"
import { useHistory } from "react-router-dom"

const FriendsList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.getUsers?.data)
  const isLoading = useSelector((state) => state?.loading?.isLoading)
  const notFound = useSelector((state) => state?.notFound?.notFound)
  const userId = useSelector((state) => state?.user?.data?.id)
  const history = useHistory()

  useEffect(() => {
    if (users?.length === undefined) {
      dispatch(getUsers())
    }
  }, [dispatch, users])

  const test = (user) => {
    dispatch(
      storeToUser({
        fromId: userId,
        name: user?.name,
        toId: user?._id,
        imageUrl: user?.imageUrl,
      })
    )

    dispatch(
      storeFromUser({
        fromId: user?._id,
        toId: userId,
      })
    )
    history.push(`/chat/${user?._id}`)
  }

  let displayUserList
  if (isLoading) {
    displayUserList = <Loader />
  } else if (users?.length > 0) {
    displayUserList = users.map((user) => (
      <div className="col-sm-6 col-md-4 col-lg-3" key={user._id}>
        <div className="frinedsList__smallScreen">
          <div className="friendsList__card">
            <div className="text-center">
              <img
                src={user?.imageUrl}
                alt="User"
                className="friendsList__cardImg"
              />
            </div>
            <div className="friendsList__userInfo mt-2">
              <div className="d-flex justify-content-between align-items-center">
                <i className="far fa-user"></i>
                <span>{user?.name}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center ">
                <i className="far fa-flag"></i>
                <span>{user?.country}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center ">
                <i className="fa fa-mars-stroke"></i>
                <span>{user?.maritalStatus}</span>
              </div>

              <button className="btn  btn-block" onClick={() => test(user)}>
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  } else if (notFound) {
    displayUserList = (
      <div className=" mx-auto mt-5">
        <img src={NotFound} className="notFound__img" alt="notFound" />
        <h5>No Record found</h5>
      </div>
    )
  }

  return (
    <div className="friendsList">
      <div className="d-flex justify-content-center">
        <h4>Start Chating with friends </h4>
      </div>
      <div className="friendsList__content">
        <div className="row">{displayUserList}</div>
      </div>
    </div>
  )
}

export default FriendsList
