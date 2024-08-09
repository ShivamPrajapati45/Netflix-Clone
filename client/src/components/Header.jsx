import React from 'react'
import styled from 'styled-components'
import logo from "../assets/logo.png"
import {useNavigate} from "react-router-dom"


const Header = ({login}) => {
  
  const navigate = useNavigate();
  return (
    <Container className='flex a-center j-between'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(login ? "/login" : "/register")}>
        {login ? "Log In " : "Sign Up"}
      </button>
    </Container>
    
  )
}

export default Header

const Container = styled.div`
  padding: 0 4rem;
  .logo{
    img{
      height: 4rem;
    }
  }

  button{
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    background-color: #e50914;
    border: none;
    color: white;
    font-weight: bold;
    font-style: oblique;
    font-size: 1rem;
    cursor: pointer;
    &:hover{
      background-color: #97171dd9;
    }
  }
`;