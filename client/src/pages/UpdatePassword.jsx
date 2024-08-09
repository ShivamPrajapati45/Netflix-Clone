import React,{useState,useEffect} from 'react';
import BackGroundImage from "../components/BackGroundImage.jsx";
import Header from "../components/Header.jsx";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css"
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../store";

const UpdatePassword = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();

  const[email,setEmail] = useState("");
  const[newPassword,setNewPassword] = useState("")
  const[loading,setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/users/updatePassword",
        {email,newPassword},
        {withCredentials : true}
      );
      if(response.status == 201){
        dispatch(getUser(response.data.user));
        setEmail("");
        setNewPassword("");
        toast.success(response.data.msg);
        navigate("/login")
      }
      
    }catch(error){
      if (error.response) {
        toast.error(error.response.data.msg);
      } else if (error.request) {
          console.error("Request data:", error.request);
      } else {
          console.error("Error message:", error.message);
      }
    }finally{
      setLoading(false);
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
              <h3>UPDATE  PASSWORD</h3>
            </div>
            <form className="container flex column" onSubmit={handleLogin}>
              <input type="text" placeholder="email or username" name="email" value={email} 
              onChange={(e)=> setEmail(e.target.value)}/>
              <input type="password" placeholder="new password" name="newPassword" value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
              />
              <span>Already a member ? <Link to="/login" className="signup">LOGIN</Link></span>
              <button>{loading ? "Updating.." : "Update"}</button>
            </form>
          </div>
        </div>  
      </div>
    </Container>
  )
}
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
      gap:2rem;
      height: 85vh;
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
export default UpdatePassword