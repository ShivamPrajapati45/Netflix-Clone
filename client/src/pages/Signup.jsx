import React, { useEffect, useState } from "react";
import BackGroundImage from "../components/BackGroundImage.jsx";
import Header from "../components/Header.jsx";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();

  const[name,setName] = useState("");
  const[username,setUsername] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[signUp,setSignUp] = useState(false);
  const user = useSelector((state) => state.netflix.user);

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })

  const handleRegister = async(e) => {
    e.preventDefault();
    try{
      setSignUp(true);
      const response = await axios.post("http://localhost:8000/users/register",{
        name,
        username,
        email,
        password
      });

      if(response.status == 201){
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        toast.success(response.data.msg);
        navigate("/login");
      }

    }catch(error){
      if (error.response) {
        toast.error(error.response.data.msg);
      } else if (error.request) {
          // The request was made but no response was received
          console.error("Request data:", error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
      }
  }finally{
    setSignUp(false);
  }
  }
// useEffect(()=>{
//   onAuthStateChanged(firebaseAuth,(user)=>{
//     if(user) navigate("/login")
//   })

// },[handleRegister])

  return (
    <Container>
      <BackGroundImage />
      <div className="content">
        <Header login={true} />
        <div className="body">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
          </div>
          <form className="form" onSubmit={handleRegister}>
            <h2>SIGNUP</h2>
              <input type="text" placeholder="Enter name.." name="name" value={name} 
              onChange={(e)=> setName(e.target.value)}/>
              <input type="text" placeholder="Enter username.." name="username" value={username}
                onChange={(e)=> setUsername(e.target.value)}/>
              <input type="email" placeholder="Email address" name="email" value={email} 
              onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" name="password" value={password}
                onChange={(e)=> setPassword(e.target.value)}/>
              <span>Already have an account ? <Link className="login" to="/login">Login</Link></span>
              <button>{signUp ? "Creating.." : "Sign Up"}</button>
          </form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  color: white;
  .content {
    position: absolute;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 13vh 73vh;
    .body {
      gap: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .text {
        text-align: center;
        font-size: 18px;
      }
      .form {
        display: flex; 
        flex-direction: column;
        background-color: #0000009b;
        padding: 1.5rem 2rem;
        gap: 10px;
        justify-content: center;
        align-items: center;
        border-radius: 0.8rem;
        h2{
          margin-bottom: 15px;
        }
        .login{
          text-decoration: none;
          color: skyblue;
          font-size: 18px;
          &:hover{
            text-decoration: underline;
          }
        }
        input {
          color: black;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 5px;
          font-weight: bold;
          font-size: 16px;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1.4rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
          transition: 0.4s ease-in-out;
          &:hover{
            background-color: #8f1943;
            transition: 0.2s ease-in-out;
          }
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default Signup;
