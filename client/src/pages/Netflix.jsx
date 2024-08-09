import React,{useEffect, useState} from 'react'
import Navbar from "../components/Navbar.jsx"
import { FaPlay } from 'react-icons/fa'
import {AiOutlineInfoCircle} from "react-icons/ai"
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, getGenres } from '../store/index.js'
import Slide from '../components/Slide.jsx'
import ReactPlayer from 'react-player';
import BackGroundImage from "../components/BackGroundImage.jsx";
import backgroundImage from "../assets/home.jpg"


const Netflix = () => {
  const[isScrolled,setIsScrolled] = useState(null);
  const user = useSelector((state) => state.netflix.user);
  // console.log("User : ",user);

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  })
  
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return ()=> (window.onscroll = null)
  }
  //Slice
  const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const details = useSelector((state) => state.netflix.detail);
  // console.log("detail", details);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getGenres());
  },[user])

  useEffect(()=>{
    if(genresLoaded) {
      dispatch(fetchMovies({ type: "all" }))
    }
  },[genresLoaded,user])

  const trailerFromStore = useSelector((state) => state.netflix.Trailer);

  return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="hero">
        <div className='player'>
          {
            trailerFromStore?.length > 0 ? 
            (
              <ReactPlayer url={`https://www.youtube.com/watch?v=${trailerFromStore.length > 0 ? trailerFromStore[0]?.key : ""}`}  className="background-image"  controls={false} width='100%' height='100%' playing={false}/>
            ) : (
              <img src={backgroundImage} alt="backgroundImage" className='background-image' /> 
            )
          }
          
        </div>
        <div className="container">
          <div className="logo">
            <h3>{details == null ? "Stranger Things" : details?.title}</h3>
            <span>{details != null ? `Release Date : ${details?.release_date}` : ""}</span>
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center">
              <FaPlay onClick={() => navigate("/player")}/> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle/>
            </button>
          </div>
        </div>
      </div>
      <Slide movies={movies} />
    </Container>
  )
}

export default Netflix;

const Container = styled.div`
  background-color: black;
  position: relative;
  .hero{
    position: relative;
    .player{
      width: 100vw;
      height: 100vh;
      .background-image{
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .container{
      position: absolute;
      bottom: 5rem;
      .logo{
        display: flex;
        flex-direction: column;
        margin-left: 3rem;
        gap: 10px;
        h3{
          font-size: 4rem;
          font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        span{
          font-size: 1.5rem;
          font-weight: bold;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
      }
      .buttons{
        margin: 5rem;
        gap: 2rem;
        button{
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover{
            opacity: 0.8;
          }
          &:nth-of-type(2){
            background-color: rgba(109,109,110,0.7);
            color: white;
            svg{
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`