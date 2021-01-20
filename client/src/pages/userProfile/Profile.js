import React, { useEffect, useState } from "react"
import { useLocation, useHistory, Link } from "react-router-dom"
import "./Profile.css"
import csc from "country-state-city"
import { updateUserProfile } from "../../redux/actions/userAction"
import { useDispatch, useSelector } from "react-redux"
const Profile = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const errors = useSelector((state) => state.errors?.errors)
  const userId = useSelector((state) => state?.user?.data?.id)
  const [values, setValues] = useState({
    countries: [],
    states: [],
    cities: [],
    age: "",
    maritalStatus: "",
    state: "",
    city: "",
    country: "",
    gender: "",
  })

  useEffect(() => {
    setValues({ countries: csc.getAllCountries() })
    // return () => {
    //   alert("hii")
    // }
  }, [])

  const getStates = (e) => {
    const code = e.target.value.split("-")
    setValues({
      ...values,
      states: csc.getStatesOfCountry(code[0]),
      country: code[1],
    })
  }

  const getCities = (e) => {
    const code = e.target.value.split("-")
    setValues({
      ...values,
      cities: csc.getCitiesOfState(code[0], code[1]),
      state: code[2],
    })
  }
  const {
    countries,
    states,
    cities,
    state,
    country,
    city,
    maritalStatus,
    gender,
  } = values

  const submitForm = () => {
    const data = {
      id: userId,
      country: country ? country : "",
      state: state ? state : "",
      city: city ? city : "",
      // age: age ? age : "",
      maritalStatus: maritalStatus ? maritalStatus : "",
      gender: gender ? gender : "",
      isProfile: true,
    }

    dispatch(updateUserProfile(data, history))
  }
  return (
    <div className="container ">
      <div className="profile__parent">
        <div className="profile">
          {/* <h1>{location?.state?.message} </h1> */}
          <h4 className="text-center"> {location.state?.message} </h4>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label>Country</label>
                <select
                  className={
                    errors?.country ? "form-control is-invalid" : "form-control"
                  }
                  onChange={(e) => getStates(e)}>
                  <option value="">--Select Country--</option>
                  {countries &&
                    countries.map((country) => (
                      <option
                        value={country?.isoCode + "-" + country?.name}
                        key={country.isoCode}>
                        {country?.name}
                      </option>
                    ))}
                </select>
                <span className="text-danger font-weight-bold">
                  {errors?.country}
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>State</label>
                <select
                  className={
                    errors?.state ? "form-control is-invalid" : "form-control"
                  }
                  onChange={(e) => getCities(e)}>
                  <option value="">--Select State--</option>
                  {states &&
                    states.map((state) => (
                      <option
                        value={
                          state?.countryCode +
                          "-" +
                          state?.isoCode +
                          "-" +
                          state?.name
                        }
                        key={state.countryCode + state.isoCode}>
                        {state?.name}
                      </option>
                    ))}
                </select>
                <span className="text-danger font-weight-bold">
                  {errors?.state}
                </span>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group">
                <label>City</label>
                <select
                  className={
                    errors?.city ? "form-control is-invalid" : "form-control"
                  }
                  onChange={(e) =>
                    setValues({ ...values, city: e.target.value })
                  }>
                  <option value="">--Select City--</option>
                  {cities &&
                    cities.map((city) => (
                      <option value={city.name} key={city.name}>
                        {city?.name}
                      </option>
                    ))}
                </select>
                <span className="text-danger font-weight-bold">
                  {errors?.city}
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Marital Status</label>
                <select
                  className={
                    errors?.maritalStatus
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  onChange={(e) =>
                    setValues({ ...values, maritalStatus: e.target.value })
                  }>
                  <option value="">--Select Status--</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
                <span className="text-danger font-weight-bold">
                  {errors?.maritalStatus}
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Gender</label>
                <select
                  className={
                    errors?.gender ? "form-control is-invalid" : "form-control"
                  }
                  onChange={(e) =>
                    setValues({ ...values, gender: e.target.value })
                  }>
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <span className="text-danger font-weight-bold">
                  {errors?.gender}
                </span>
              </div>
            </div>
            {/* <div className="col-lg-6">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  className={
                    errors?.age ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Enter your age."
                  min="10"
                  max="100"
                  onChange={(e) =>
                    setValues({ ...values, age: e.target.value })
                  }
                />
                <span className="text-danger font-weight-bold">
                  {errors?.age}
                </span>
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <button className="btn btn-dark btn-block" onClick={submitForm}>
                  Submit
                </button>
              </div>
            </div>
            {location.state?.show ? (
              <div className="col-lg-6">
                <div className="form-group">
                  <Link to="/find-friends" className="btn btn-info btn-block">
                    Back
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
