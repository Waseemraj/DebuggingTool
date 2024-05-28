import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="nav">
          <div className="logo">
            <Link to="/" className="Webex">Webex</Link> for Developers
          </div>
          <ul className="list">
           <li> <Link to="/docs">Documentation</Link></li>
            <li>Blog</li>
            <li>Support</li>
            <li>Resources</li>
          </ul>
          <div className="serach_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search Search_icon"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>

            <input type="text" className="text" placeholder="Search" />
            <div className="user"></div>
          </div>
        </div>
      </div>
    </>
  );
}
