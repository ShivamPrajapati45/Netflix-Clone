import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Login, Signup, Netflix, Player,Search,UpdatePassword } from "./pages/index.js"
import Movies from './pages/Movies.jsx';
import TvShows from './pages/TvShows.jsx';
import LikedMovies from './pages/LikedMovies.jsx';


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Signup/>}/>  
            <Route exact path='/player' element={<Player/>}/>
            <Route exact path='/' element={<Netflix/>}/>
            <Route exact path='/movies' element={<Movies/>}/>
            <Route exact path='/tv' element={<TvShows/>}/>
            <Route exact path='/mylist' element={<LikedMovies/>}/>
            <Route exact path='/search' element={<Search/>}/>
            <Route exact path='/updatePassword' element={<UpdatePassword/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App