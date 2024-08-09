import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbUpFill,RiThumbDownFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import axios from "axios"
import { getDetail, getKey, removeLikedMovies } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { options } from '../utils/constant';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';


const SearchCard = React.memo(({movieData, isLiked=false}) => {
    
    const[hover,setHover] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.netflix.user);

    const[email,setEmail] = useState(undefined);
    
    const trailerFromStore = useSelector((state) => state.netflix.Trailer);
    

        useEffect(()=>{
            if(user){
                setEmail(user.email);
            }else{
                navigate("/login")
            }
        })
        const addToList = async() => {
            try{
                const response = await axios.post("http://localhost:8000/users/add",{email,data:movieData});
                console.log(response);
                if(response.status == 201){
                    console.log("Data", movieData);
                    
                    toast.success(movieData.title + " Added",{
                        position: "top-left"
                    })
                }
                
            }catch(err){
                if(err.response){
                    toast.error(err.response.data.msg,{
                        position: "top-left"
                    })
                }
            }
        }

        const getMovie = async (movie_id) => {
            try{
                const movie = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos`,options);
                let results = movie.data.results;
                const trailer = results.filter((item)=>{
                    return item.type == "Trailer" || item.type == "Teaser"
                })
                dispatch(getKey(trailer));
            }catch(err){
                console.log("Video : ",err);
            }
        }
        const getDetails = async (movie_id) => {
            try{
                const detail = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`,options);
                // console.log("Detail : ",detail);
                const data = detail.data;
                dispatch(getDetail(data))
            }catch(err){
                console.log(err);
            }
        }

    const handlePlayer = () => {
        navigate("/player");
        getMovie(movieData.id);
        getDetails(movieData.id);
    }
    const handleHover = () => {
        setHover(true);
        getMovie(movieData.id);
        getDetails(movieData.id);
    }

    const removeMovie = () => {
        // console.log("Search : ",movieData);
        
        dispatch(removeLikedMovies({ movieId : movieData.id,email}))
        toast.success("Removed")
    }

    return (
        
        <Container 
        onMouseEnter={handleHover}
        onMouseLeave={() => setHover(false)}
    >
        {movieData?.backdrop_path ? (
            <img src={`https://image.tmdb.org/t/p/w500${ movieData.image || movieData?.backdrop_path }`} alt="movie"/>
        ) : <img src={`https://image.tmdb.org/t/p/w500${ movieData.image || movieData?.poster_path }`} className='image' alt='movie'/>}
        {hover && (
            <div className="hover">
                <div className="image-video-container">
                    {
                        trailerFromStore?.length > 0 ? 
                        (
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${trailerFromStore?.length > 0 ? trailerFromStore[0]?.key : ""}`} playing={false} className="react-player"  width='100%' height='100%' controls={true}/>
                        ) 
                            : 
                        (
                            <img src={`https://image.tmdb.org/t/p/w500${movieData.image || movieData?.backdrop_path || movieData?.poster_path}`} alt="movie"/>
                        )
                    }
                </div>
                <div className="info-container flex column">
                    <h3 className="name" onClick={()=>navigate("/player")}>
                        {movieData.name || movieData.title}
                    </h3>
                    <div className="icons flex  j-between">
                        <div className="controls flex">
                            <IoPlayCircleSharp title='play'  onClick={handlePlayer}/>
                            <RiThumbUpFill title='like'/>
                            <RiThumbDownFill title='dislike'/>
                            {
                                isLiked ? 
                                (<BsCheck title='Remove from list' onClick={removeMovie}/>):(<AiOutlinePlus title='Add to my list' onClick={addToList}/>)
                            }
                        </div>
                    </div>
                    <div className="genres flex">
                        <ul className='flex'>
                            {movieData?.genre?.map((genre)=>(
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}
        </Container>
  )
})

export default SearchCard;

const Container = styled.div`
    max-width: 300px;
    width: 280px;
    height: 100%;
    cursor: pointer;
    position: relative;
    .image{
        max-width: 300px;
        width: 280px;
        height: 160px;
        cursor: pointer;
        border: 1px solid white;
    }
    img{
        border-radius: 0.4rem;
        width: 100%;
        height: 100%;
        transition: 0.3s ease-in-out;
    }
    .hover{
        height: max-content;
        width: 17rem;
        position: absolute;
        top: -10rem;
        left: 3px;
        border-radius: 0.3rem;
        background-color: #181818;
        box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
        transition: 0.3s ease-in-out;
        .image-video-container{
            position: relative;
            height: 150px;
            img{
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 4;
                position: absolute;
            }
        }
        .info-container{
            padding: 1rem;
            gap: 0.5rem;
        }
        .icons{
            .controls{
                display: flex;
                gap: 1rem;
            }
            svg{
                font-size: 22px;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover{
                    color: #b8b8b8;
                }
            }
        }
        .genres{
            ul{
                gap: 1rem;
                li{
                    padding-right: 0.7rem;
                    &:first-of-type{
                        list-style-type: none;
                    }
                }
            }
        }
    }
`