import {createSlice,configureStore,createAsyncThunk} from "@reduxjs/toolkit";
import { persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios"
import { API_KEY, TMDB_BASE_URI } from "../utils/constant";

const persistConfig = {
  key : "root",
  storage,
  whitelist : ['user']
};

const initialState = {
    movies : [],
    genres : [],
    genresLoaded : false,
    Trailer : [],
    check : false,
    searchedMovie : null,
    detail : null,
    user : null
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const {data : { genres },} = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=96c532429da51c75266da18c808d88c9")
        // console.log("genres : ",genres);
    return genres;
})

const createArrayFromRawData = (array,moviesArray,genres) => {
    // console.log("Array : ",array);
    array.forEach((movie)=>{
        const movieGenres = [];
        movie.genre_ids.forEach((genre)=>{
            const name = genres.find(({id}) => id === genre);
            if(name) movieGenres.push(name.name);
        });
        if(movie.backdrop_path){
            moviesArray.push({
                id : movie.id,
                name : movie?.original_name ? movie.original_name : movie.original_title,
                image : movie.backdrop_path,
                genre : movieGenres.slice(0,3),
            });
            // console.log("Genres : ",moviesArray);
        }
    })
}

const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    // console.log("Movie Array : ",moviesArray);
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
      const {
        netflix: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${TMDB_BASE_URI}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
      );
    }
);


export const fetchDataByGenre = createAsyncThunk(
    "netflix/genre",
    async ({ genre, type }, thunkAPI) => {
      const {
        netflix: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `https://api.themoviedb.org/3/discover/${type}?api_key=96c532429da51c75266da18c808d88c9&with_genres=${genre}`,
        genres
      );
    }
  );

export const getUserLikedMovies = createAsyncThunk("netflix/getLiked", async(email)=>{
  const {data :{movies},} = await axios.get(`http://localhost:8000/users/liked/${email}`)
  return movies;
})

export const removeLikedMovies = createAsyncThunk("netflix/deleteLiked", async({email, movieId})=>{
  // console.log(movieId,email);
  const {data :{movies},} = await axios.put(`http://localhost:8000/users/delete`,{
    email,
    movieId
  })
  return movies;
})

const NetflixSlice = createSlice({
    name : "Netflix",
    initialState,
    reducers : {
      getKey : (state,action) => {
        state.Trailer = action.payload
      },
      setCheck : (state,action) => {
        state.check = action.payload
      },
      setSearchedMovie : (state,action) => {
        state.searchedMovie = action.payload
      },
      getDetail : (state,action) => {
        state.detail = action.payload
      },
      getUser : (state,action) => {
        state.user = action.payload
      }
    },
    extraReducers : (builders) => {
        builders.addCase(getGenres.fulfilled , (state,action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builders.addCase(fetchMovies.fulfilled , (state,action) => {
            state.movies = action.payload;
        });
        builders.addCase(fetchDataByGenre.fulfilled , (state,action) => {
            state.movies = action.payload;
        })
        builders.addCase(getUserLikedMovies.fulfilled , (state,action) => {
            state.movies = action.payload;
        })
        builders.addCase(removeLikedMovies.fulfilled , (state,action) => {
            state.movies = action.payload;
        })
    },
});

const persistedReducer = persistReducer(persistConfig, NetflixSlice.reducer);

export const { getKey,setCheck,setSearchedMovie,getDetail,getUser } = NetflixSlice.actions;

export const store = configureStore({
    reducer : {
      netflix : persistedReducer,
    }
});

export const persister = persistStore(store);


