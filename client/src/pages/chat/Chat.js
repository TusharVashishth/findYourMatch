import React, { Fragment, useEffect } from "react"
import ChatHeader from "../../components/chat/ChatHeader"
import ChatSection from "../../components/chat/ChatSection"
import Sidebar from "../../components/chat/Sidebar"
import "./Chat.css"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CLEAR_MESSAGE } from "../../redux/actions/types"
import { getMessages } from "../../redux/actions/chatUserAction"

const Chat = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state?.user?.data?.id)
  useEffect(() => {
    dispatch({
      type: CLEAR_MESSAGE,
      paylod: [],
    })
    if (id && userId) {
      dispatch(getMessages(0, 100, id, userId))
    }
  }, [id, userId, dispatch])
  return (
    <Fragment>
      <ChatHeader />
      <div className="chat">
        <Sidebar userId={userId} toId={id} />
        <ChatSection toId={id} />
      </div>
    </Fragment>
  )
}

export default Chat
