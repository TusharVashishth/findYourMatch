import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const ChatHeader = () => {
  const user = useSelector((state) => state.user?.data)
  const chatUser = useSelector((state) => state?.chatUsers?.chatUser)
  return (
    <div className="chatHeader fixed-top">
      <div className="chatHeader__left chatHeader__common">
        <img src={user?.image} className="chatSidebar__contentImg" alt="user" />
        <h5>{user?.name}</h5>
      </div>
      <div className="chatHeader__right chatHeader__common justify-content-between">
        <div className="d-flex align-items-center">
          {chatUser?.imageUrl ? (
            <img
              src={chatUser?.imageUrl}
              className="chatSidebar__contentImg"
              alt="user"
            />
          ) : (
            ""
          )}

          <h5>{chatUser?.name}</h5>
        </div>
        <Link to="/find-friends" className="text-dark">
          <i className="fas fa-user-friends"></i>
        </Link>
      </div>
    </div>
  )
}

export default ChatHeader
