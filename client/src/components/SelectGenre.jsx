import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchDataByGenre } from '../store';

const SelectGenre = ({genres,type}) => {
    const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        dispatch(
          fetchDataByGenre({
            genres,
            genre: e.target.value,
            type,
          })
        );
      }}
    >
      {genres.map((genre) => {
        return (
          <option className='option' value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  )
}

export default SelectGenre
const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1rem;
  padding: 2px 5px;
  outline: none;
  border: 2px solid red;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 5, 0.5);
  color: white;
  .option{
    color: black;
  }
`;