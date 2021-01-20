import io from "socket.io-client"
import { domain } from "./urls"

const socket = io(domain)

export default socket
