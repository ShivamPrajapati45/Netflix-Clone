import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {BsArrowLeft} from "react-icons/bs"
import video from "../assets/Video.mp4"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ReactPlayer from "react-player"


const Player = () => {
    const navigate = useNavigate();
    const trailerFromStore = useSelector((state) => state.netflix.Trailer);
    const user = useSelector((state) => state.netflix.user);

    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    })


  return (
    <Container>
        <div className="player">
            <div className="back"> 
                <BsArrowLeft onClick={() => navigate(-1)}/>
            </div>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${trailerFromStore.length > 0 ? trailerFromStore[0]?.key : ""}`} playing={false} className="react-player"  width='100%' height='100%' controls={true}/>
        </div>
    </Container>
  )
}

export default Player;

const Container = styled.div`
    .player{
        width: 100vw;
        height: 100vh;
        .back{
            position: absolute;
            padding: 2rem;
            z-index: 1;
            svg{
                font-size: 3rem;
                cursor: pointer;
            }
        }
        .react-player{
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
`