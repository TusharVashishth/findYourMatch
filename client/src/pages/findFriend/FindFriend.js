import React from "react"
import FriendsList from "../../components/friendsList/FriendsList"
import Header from "../../components/navbar/Header"
import Search from "../../components/searchBar/Search"
import "./FindFriend.css"
const FindFriend = () => {
  return (
    <div className="findFriend">
      <Header />
      <div className="container">
        <div className="findFriend__content">
          <Search />
          <FriendsList />
        </div>
      </div>
    </div>
  )
}

export default FindFriend
