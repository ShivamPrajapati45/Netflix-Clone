import React, { useEffect, useState } from "react";
import BackGroundImage from "../components/BackGroundImage.jsx";
import Header from "../components/Header.jsx";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { getUser } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("")
  const[login,setLogin] = useState(false);
  const user = useSelector((state) => state.netflix.user);

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      setLogin(true);
      const response = await axios.post(
        "http://localhost:8000/users/login",
        {email,password},
        {withCredentials : true}
      );
      if(response.status == 201){
        dispatch(getUser(response.data.user));
        setEmail("");
        setPassword("");
        toast.success(response.data.msg);
        navigate("/")
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
      setLogin(false);
    }
  }

  return (
    <Container>
      <BackGroundImage/>
      <div className="content">
        <Header/>
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>LOGIN</h3>
            </div>
            <form className="container flex column" onSubmit={handleLogin}>
              <input type="text" placeholder="email or username" name="email" value={email} 
              onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" name="password" value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
              <span>don't have an account ? <Link to="/register" className="signup">SIGNUP</Link></span>
              <button>{login ? "Logging.." : "Login"}</button>
              <span>forgot password ? <Link className="update" to="/updatePassword">click here </Link></span>
            </form>
          </div>
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
    grid-template-rows: 15vh 80vh;
    .form-container{
      height: 75vh;
      .update{
        color: white;
        text-decoration: none;
        font-weight: 500;
        font-size: 1.1rem;
        transition: 0.3s ease-in-out;
        &:hover{
          color: #00aaffa9;
          transition: 0.3s ease-in-out;
        }
      }
      .form{
        padding: 2rem;
        width: 25vw;
        gap: 2rem;
        background-color: #000000b0;
        color: white;
        .container{
          gap: 1rem;
          input{
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          .signup{
            font-weight: 600;
            color: skyblue;
            text-decoration: none;
            transition: 0.3s ease-in-out;
            &:hover{
              text-decoration: underline;
              transition: 0.3s ease-in-out;
            }
          }
          button{
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
            &:hover{
              background-color: #e50914a3;
            }
          }
        }
      }
    }
  }
  
`;

export default Login;
