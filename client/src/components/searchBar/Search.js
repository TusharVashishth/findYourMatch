import React, { useState } from "react"
import "./Search.css"
import { searchUser } from "../../redux/actions/userAction"
import { useDispatch, useSelector } from "react-redux"
const Search = () => {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const userId = useSelector((state) => state?.user?.data?.id)
  const submitForm = (e) => {
    e.preventDefault()
    const data = {
      name: search,
      id: userId,
    }
    dispatch(searchUser(data))
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={(e) => submitForm(e)} className="search">
        <input
          type="text"
          className="search__textbox"
          placeholder="Search friend by name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn search__button">Search</button>
      </form>
    </div>
  )
}

export default Search
