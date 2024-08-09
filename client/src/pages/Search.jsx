import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getSearchMovies, setSearchedMovie } from "../store";
import SearchCard from "../components/SearchCard";

const Search = () => {
  const navigate = useNavigate();
    const[search,setSearch] = useState("");
    const[loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const searchedMovie = useSelector((store)=>store.netflix.searchedMovie)
    const[isScrolled,setIsScrolled] = useState(null);

    const user = useSelector((state) => state.netflix.user);

    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    })
  
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return ()=> (window.onscroll = null)
    }
        useEffect(()=>{
            console.log("Data : ",searchedMovie);
        },[search])

        const handleSearch = async(e) => {
            e.preventDefault();
            if(search == ""){
                alert("Enter something to search ..");
                return;
            }
            try {
                setLoading(true);
                const movie = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}`,options);
                dispatch(setSearchedMovie(movie.data.results));
                console.log("Search : ",searchedMovie);
            } catch (error) {
                console.log("Search : ",error);
            }finally{
                setLoading(false);
                setSearch("")
            }
        }

  return (
    <Container className="">
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
            <div className="brand flex a-center j-center">
                <img src={logo} alt="Logo" />
            </div>
        </div>
        <div className="right flex a-center">
        <form onSubmit={handleSearch} className="">
          <div className="search">
            <input type="text" value={search} placeholder="search.." onChange={(e) => setSearch(e.target.value)}/>
            <button>{loading ? "searching.." : "Search"}</button>
          </div>
        </form>
            <button onClick={() => navigate("/")}>Home</button>
        </div>
    </nav>
    
    <h3>{search}</h3>
    <div className="card">
        {searchedMovie?.length == 0 ? (<h1>Movie Not Found !</h1>): 
            searchedMovie?.map((data,index)=>{
                return <SearchCard movieData = {data} key={data.id} index={index}/>
        })}
    </div>
    </Container>
  );
};

export default Search;

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 4rem;
    .scrolled {
    background-color: black;
    opacity: 0.8;
    }
    form{
        .search {
        background-color: white;
        width: 100%;
        padding: 2px;
        border-radius: 0.3rem;
        input{
            outline: none;
            border: none;
            padding: 10px;
            font-size: 16px;
            font-weight: bold;
            font-family: Arial, Helvetica, sans-serif;
        }
    }
    }
    nav {
        position: sticky;
        top: 0;
        height: 4rem;
        width: 100%;
        margin-left: -3rem;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 2;
        padding: 0 5rem;
        align-items: center;
        transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
    }
    .right {
      gap: 20px;
      }
      button{
        padding: 0.6rem 1.2rem;
        border-radius: 5px;
        background-color: #e50914;
        border: none;
        color: white;
        font-weight: bold;
        font-style: oblique;
        font-size: 16px;
        cursor: pointer;
      }
    }
    .card{
        display: flex;
        justify-content: center;
        margin-top: 10rem;
        flex-wrap: wrap;
        height: 100%;
        gap: 1rem;
        transition: 0.3s ease-in-out;
        margin-left: 20px;
    }
    .logo {
        img {
            height: 4rem;
        }
    }
    button {
        padding: 0.6rem 1.2rem;
        border-radius: 5px;
        background-color: #e50914;
        border: none;
        color: white;
        font-weight: bold;
        font-style: oblique;
        font-size: 1rem;
        cursor: pointer;
    }
    
`;
