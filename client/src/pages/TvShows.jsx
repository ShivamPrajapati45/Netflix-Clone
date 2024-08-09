import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Slide from '../components/Slide';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

const TvShows = () => {
    const user = useSelector((state) => state.netflix.user);

    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    })
    const[isScrolled,setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return ()=> (window.onscroll = null)
    }

    const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state)=> state.netflix.genres);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getGenres());
    })

    useEffect(()=>{
            if(genresLoaded) {
            dispatch(fetchMovies({ genres, type: "tv" }))
        }
    },[genresLoaded])


    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled}/>
            </div>
            <div className="data">
            <SelectGenre genres={genres} type="tv"/>
                {
                    movies.length ? <Slide movies={movies}/> :
                    <NotAvailable/>
                }
            </div>
        </Container>
    )
}

export default TvShows;
const Container = styled.div`
    .data{
        margin-top: 8rem;
        .not-available{
            text-align: center;
            color: white;
            margin-top: 4rem;
        }
    }
`