import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaPowerOff } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../store";
import { isPending } from "@reduxjs/toolkit";
// axios.defaults.withCredentials = true;

const Navbar = ({ isScrolled }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "MyList", link: "/mylist" },
    ];

    const handleLogout = async () => {
      // dispatch(getUser(null))
      try{
       const response = await axios.post("http://localhost:8000/users/logout",{},{ withCredentials : true });
       console.log("Response : ",response);
       if(response.status == 201){
        toast.success(response.data.msg);
        dispatch(getUser(null))
        navigate("/login");
       }
      }catch(error){
        if(error.response)
        toast.error(error.response.data.msg);
        console.log("Logout Error : ",error);
      }
    }

  return (
    <Container>
        <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
            <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
            </div>
            <ul className="links flex">
            {links.map(({ name, link }) => {
                return (
                <li key={name}>
                    <NavLink className={({ isActive, isPending}) => isActive ? "active" : "link"} to={link}>{name}</NavLink>
                </li>
                );
            })}
            </ul>
        </div>
        <div className="right flex a-center">
            <button onClick={() => navigate("/search")} className="search" title="search">
                <FaSearch/>
            </button>
            <button title="logout" className="logout" onClick={handleLogout}>
                <FaPowerOff />
            </button>
        </div>
    </nav>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`

  nav{
    background-color: black;
    opacity: 0.7;
  }
  .scrolled {
    background-color: black;
    opacity: 0.9;
  }
  nav {
    position: sticky;
    top: 0;
    height: 4rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 4rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        transition: 0.3s ease-in-out;
        .active{
          color: red;
          transition: color 0.3s ease-in-out;
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

        }
        li {
          .link{
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            &:hover{
              color: red;
              transition: 0.3s ease-in-out;
            }
          }
          a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease-in-out;
            font-size: 18px;
          }
        }
      }
    }
    
    .right {
      gap: 2rem;
      }
      .logout{
        svg{
          &:hover{
            color: red;
            transition: 0.3s ease-in-out;
          }
        }
      }
      button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: white;
          font-size: 1.2rem;
        }
      }
    }
`;
