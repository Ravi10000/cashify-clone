import "./search.styles.scss";
import {useState} from 'react'
import { useForm } from "react-hook-form";

import Select from "../select/select.component";
// import React from 'react'

const Search = () => {
    const [filter, setFilter] = useState('');
    const options = ['Brand', 'Model', 'RAM', 'STORAGE'];
    const [filterType, setFilterType] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const getOption = (option)=>{
    setFilter(option.toLowerCase())
    if(option === 'RAM' || option === 'STORAGE'){
        setFilterType('GB');
        return
    }
    setFilterType('');
    
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="search">
        <p className="wip">search feature - work in progress*</p>
        <div className="filter-container">
        <Select passOption={getOption} options={options}/>
        </div>
        <div className="input-container">
          <input
            type="search"
            name="search"
            className="search-input"
            placeholder="Search"
            {...register("search")}
          />
          {
            filterType && <div className="filter-type">
            <p>{filterType}</p>
          </div>}
          <button className="search-icon" type="submit">
            <img
              src="/icons/search-light.png"
              alt="search-icon"
              className="search-icon-img"
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
