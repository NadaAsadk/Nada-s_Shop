import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/User';
import axios from 'axios';
import { CartItems } from '../../pages/Cart/components/Cart';

export default function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/SignIn');
  };
 
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4 .4 67.6 .1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z" /></svg> Nada's Shop </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          {
            userName ?
              <>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/'>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/products?page=1&limit=10'>Products</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/Categories'>Categories</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/Cart'>Cart <span><CartItems /></span></NavLink>
                  </li>
                  <li className="nav-item">
                    <button onClick={logOut}>Log Out</button>
                  </li>
                </ul>
                <p>Welcome {userName}</p>


              </>
              :
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/'>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/products?page=1&limit=10'>Products</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/Categories'>Categories</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/Signin'>Sign in</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to='/Register'>Register</NavLink>
                  </li>
                </ul>
              </>
          }






        </div>
      </div>
    </nav>

  )
}
