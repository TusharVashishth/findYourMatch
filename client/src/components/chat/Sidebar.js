import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { list } from "../../redux/actions/chatUserAction"
import { useDispatch, useSelector } from "react-redux"
import { CHAT_USER } from "../../redux/actions/types"
const Sidebar = ({ userId, toId }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const chatUsersList = useSelector((state) => state?.chatUsers?.data)

  useEffect(() => {
    if (userId) {
      dispatch(list({ id: userId }))
    }
  }, [dispatch, userId])

  const handleClick = (item) => {
    dispatch({
      type: CHAT_USER,
      paylod: {
        name: item?.name,
        imageUrl: item?.imageUrl,
      },
    })

    history.push(`/chat/${item?.toId}`)
    // console.log(item)
  }
  return (
    <div className="chatSidebar">
      {chatUsersList?.length > 0 &&
        chatUsersList[0]?.chatUsers.map((chatUser) => (
          <div
            className={
              chatUser?._id === toId
                ? "chatSidebar__content activeBar"
                : "chatSidebar__content"
            }
            key={chatUser?._id}
            onClick={() => {
              handleClick(chatUser)
            }}>
            <img
              src={chatUser?.imageUrl}
              alt="profile"
              className="chatSidebar__contentImg"
            />
            <h6>{chatUser?.name}</h6>
          </div>
        ))}
    </div>
  )
}

export default Sidebar
