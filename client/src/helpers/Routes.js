import React from "react"
import { Route, Switch } from "react-router-dom"
import Banner from "../components/banner/Banner"
import FindFriend from "../pages/findFriend/FindFriend"
import Profile from "../pages/userProfile/Profile"
import Chat from "../pages/chat/Chat"
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Banner} />
      <Route path="/find-friends" exact component={FindFriend} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/chat/:id?" exact component={Chat} />
    </Switch>
  )
}

export default Routes
