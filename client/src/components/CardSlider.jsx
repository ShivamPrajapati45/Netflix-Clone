import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick';

const CardSlider = React.memo(({title,data}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        customPaging: (i) => (
            <DotWrapper>
                <div className="dot" />
            </DotWrapper>
        ),
        appendDots: dots => (
            <DotsWrapper>
                <ul> {dots} </ul>
            </DotsWrapper>
        ),
    }

  return (
    <Container className='flex column'>
        <h1>{title}</h1>
        <div className="wrapper">
            <div className='slider' >
                <Slider {...settings} className='slide'>
                {data.map((movie,index)=>{
                    return <Card movieData={movie} index={index} key={movie.id} />
                })}
                </Slider>
            </div>
        </div>
    </Container>
  )
})

export default CardSlider;

const Container = styled.div`
    gap: 0.5rem;
    position: relative;
    padding: 1rem 0;
    h1{
        margin-left: 120px;
        margin-top: 15px;
        font-family: 'Courier New', Courier, monospace;
    }

    .wrapper{
        padding: 0 80px;
        .slider{
            gap: 0.8rem;
            transform: translate(0px);
            transition: 0.3s ease-in-out;
            margin-left: 45px;
            margin-top: 1rem;
        }
    }
`;

const DotsWrapper = styled.div`
    display: flex !important;
    justify-content: center;
    padding: 0;
    ul {
        display: flex;
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
        margin: 0 5px;
    }
`;

const DotWrapper = styled.div`
    .dot {
        width: 10px;
        height: 10px;
        background-color: #ccc;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .slick-active & .dot {
        background-color: red;
    }
`;

const Arrow = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
    width: 40px;
    height: 40px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: gray;
    }

    &::before {
        content: '';
        display: none;
    }
`;
const NextArrow = styled(Arrow)`
    right: -30px; 
    &::after {
        content: '>';
        position: absolute;
        font-weight: 200;
        font-size: 3rem;
        color: white;
        top: 15px;
        left: 8px;
    }
`;

const PrevArrow =  styled(Arrow)`
    left: -80px; 
    &::after {
        content: '<';
        position: absolute;
        font-weight: 200;
        font-size: 3rem;
        color: white;
        top: 15px;
        right: 8px;
    }
`;
