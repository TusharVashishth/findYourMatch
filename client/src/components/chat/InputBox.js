import React, { useState } from "react"
import socket from "../../helpers/socket"
import { MESSAGE } from "../../redux/actions/types"
import { useDispatch, useSelector } from "react-redux"
import Picker from "emoji-picker-react"
const InputBox = ({ toId }) => {
  const [text, setText] = useState("")
  const dispatch = useDispatch()
  const [displayEmoji, setDisplayEmoji] = useState(false)
  const userData = useSelector((state) => state?.user?.data)

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = [
      {
        to: toId,
        from: userData?.id,
        body: text,
        fromImage: userData?.image,
      },
    ]

    socket.emit("message", data)
    dispatch({
      type: MESSAGE,
      paylod: data,
    })
    setText("")
    setDisplayEmoji(false)
  }

  const onEmojiClick = (event, emojiObject) => {
    setText(text + emojiObject?.emoji)
  }
  return (
    <div className="chatInput">
      {displayEmoji ? <Picker onEmojiClick={onEmojiClick} /> : ""}

      <form className="chatInput__element" onSubmit={handleSubmit}>
        <i
          className="far fa-smile-wink icon"
          onClick={() => setDisplayEmoji(!displayEmoji)}
        />

        <input
          type="text"
          className="chatInput__input"
          placeholder="Type something.."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </form>
    </div>
  )
}

export default InputBox
