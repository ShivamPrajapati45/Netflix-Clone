import React from 'react'
import CardSlider from './CardSlider'
import styled from 'styled-components';

const Slide = React.memo(({movies}) => {
    const getMoviesFromRange = (from,to) => {
        return movies.slice(from,to);
    }

  return (
    <div>
        <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)}/>
        <CardSlider title="New Releases" data={getMoviesFromRange(10,20)}/>
        <CardSlider title="Top Rated" data={getMoviesFromRange(20,30)}/>
        <CardSlider title="Popular Movies" data={getMoviesFromRange(30,40)}/>
        <CardSlider title="All time Best" data={getMoviesFromRange(40,50)}/>
        <CardSlider title="Epics" data={getMoviesFromRange(50,60)}/>
    </div>
  )
})

export default Slide;

