import React from "react"
import "./Footer.css"
const Footer = () => {
  return (
    <div className="footer">
      <h4>Made By Tushar Vashishth with ❤ </h4>
      <div className="footer__social">
        <a href="https://www.linkedin.com/in/tushar-vashishth-b15998172/">
          <i className="fab fa-linkedin"></i>
        </a>

        <a href="https://github.com/TusharVashishth/">
          <i className="fab fa-github"></i>
        </a>

        <a href="https://www.instagram.com/tushar.vashishth/">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  )
}

export default Footer
