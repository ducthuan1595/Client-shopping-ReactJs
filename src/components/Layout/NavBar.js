import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../store/userSlice";
import styled from "./NavBar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
// import Cookies from 'js-cookie';

import { request } from "../../services/service";

const NavBar = () => {
  const onLogin = useSelector((state) => state.auth.onLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  
  // remote user curr
  const handleLogout = async () => {
    const data = await request.logout();
    if (data.data.message === "ok") {
      dispatch(logout());
      cookies.remove('currUser');
      cookies.remove("access-token");
      navigate('/login');
    }
  };

  return (
    <nav className={styled.navbar}>
      <div className={styled.link}>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styled.active : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styled.active : "")}
              to="/shop"
            >
              Shop
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styled.logo}>BOUTIQUE</div>
      <div className={styled.link}>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styled.active : "")}
              to="/cart"
            >
              <i className="fas fa-shopping-cart"></i>
              Cart
            </NavLink>
          </li>
          {onLogin ? (
            <li style={{ fontSize: "22px", textAlign: "center" }}>
              <NavLink
                className={(navData) => (navData.isActive ? styled.active : "")}
                to="/history"
              >
                <i className="fas fa-user"></i>
                {/* {userCurr?.name} */}
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? styled.active : "")}
                to="/login"
              >
                <i className="fas fa-user"></i>
                Login
              </NavLink>
            </li>
          )}
          {onLogin && (
            <li
              onClick={handleLogout}
              style={{ fontSize: "22px", cursor: "pointer" }}
            >
              (Logout)
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
