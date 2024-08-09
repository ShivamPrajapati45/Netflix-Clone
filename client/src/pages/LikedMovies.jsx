import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  getUserLikedMovies } from '../store';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import LikedCard from '../components/LikedCard';

const LikedMovies = () => {
    const[isScrolled,setIsScrolled] = useState(false);
    const[email,setEmail] = useState(undefined);
    const movies = useSelector((state) => state.netflix.movies);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.netflix.user);
    // console.log(user);
    

    useEffect(()=>{
        if(user){
            setEmail(user.email);
        }else{
            navigate("/login");
        }
    })

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return ()=> (window.onscroll = null)
    }

    useEffect(()=> {
        if(email){
            dispatch(getUserLikedMovies(email));
        }
    })

    // console.log("movies : ",movies);

  return (
    <Container>
        <Navbar isScrolled={isScrolled}/>
        <div className="content flex column">
            <h1>{`${user.name.toUpperCase()} Favorite List`}</h1>
            <div className="grid flex">
                {movies?.map((movie,index)=>{
                    return (
                        <LikedCard
                            movieData={movie}
                            index={index}
                            key={movie.id}
                            isLiked={true}
                        />
                    )
                })}
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .content{
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 2rem;

        .grid{
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
            gap: 1rem;
        }
    }
`

export default LikedMovies;

