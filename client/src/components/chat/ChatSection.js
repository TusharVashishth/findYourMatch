import React, { useEffect, useRef } from "react"
import InputBox from "./InputBox"
import socket from "../../helpers/socket"
import { MESSAGE } from "../../redux/actions/types"
import { useDispatch, useSelector } from "react-redux"
import NotFoundImg from "../../assets/images/notFound.png"
import { Link } from "react-router-dom"

const ChatSection = ({ toId }) => {
  const dispatch = useDispatch()
  const messageEl = useRef(null)
  const previoustoId = useRef()
  previoustoId.current = toId
  const messages = useSelector((state) => state?.messages?.messages)
  // const totalMessage = useSelector((state) => state?.messages?.totalMessage)
  // const skip = useSelector((state) => state?.messages?.skip)
  // const limit = useSelector((state) => state?.messages?.limit)
  const userId = useSelector((state) => state?.user?.data?.id)

  useEffect(() => {
    socket.on("server message", (data) => {
      console.log(data, previoustoId)
      if (userId === data[0].to && data[0].from === previoustoId.current) {
        dispatch({
          type: MESSAGE,
          paylod: data,
        })
      }
    })
  }, [userId, dispatch])

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight, behavior: "smooth" })
      })
    }

    // const section = document.querySelector(".chatSection")
    // section.addEventListener("scroll", (e) => {
    //   if (
    //     e.target.scrollTop === 0 &&
    //     limit !== 0 &&
    //     skip < totalMessage &&
    //     totalMessage > 40
    //   ) {
    //     dispatch(getMessages(skip + limit, limit, toId, userId))
    //   }
    // })

    // return () => {
    //   section.addEventListener("scroll", (e) => {})
    // }
  }, [])
  return (
    <div className="chatSection" ref={messageEl}>
      <div className="chatSection__chatDiv">
        {messages?.length > 0 &&
          messages.map(
            (data) =>
              data?.length > 0 &&
              data.map((message, index) => {
                if (message?.to !== toId) {
                  return (
                    <div
                      className="chatSection__msgContainer msgContainer__left"
                      key={index}>
                      <img src={message?.fromImage} alt="user" />
                      <div className="chatSection__msg">
                        <span>{message?.body}</span>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div
                      className="chatSection__msgContainer msgContainer__right"
                      key={index}>
                      <div className="chatSection__msg bg-primary text-white">
                        <span>{message?.body}</span>
                      </div>
                    </div>
                  )
                }
              })
          )}
        {!toId ? (
          <div className="chatSection__notFound">
            <img src={NotFoundImg} alt="notFound" />
            <h5>
              No Chats Founds <Link to="/find-friends">Click here</Link>
            </h5>
          </div>
        ) : (
          ""
        )}
      </div>

      {toId ? <InputBox toId={toId} /> : ""}
    </div>
  )
}

export default ChatSection
