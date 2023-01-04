import "./search.styles.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import Select from "../select/select.component";
// import React from 'react'
import { updateProducts } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";

const Search = ({updateProducts}) => {
  const [filter, setFilter] = useState("");
  const options = ["Brand", "Model", "RAM", "Storage"];
  const [filterType, setFilterType] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getOption = (option) => {
    setSearchBy(option);
    setFilter(option.toLowerCase());
    if (option === "RAM" || option === "Storage") {
      setFilterType("GB");
      return;
    }
    setFilterType("");
  };

  const onSubmit = async (data) => {
    try {
      if (!filter) return;
      if (!data.search) return;
      const search = data.search.toLowerCase();
      console.log({ search }, { filter });
      const response = await axios.get(
        `https://mrphonex-api.onrender.com/api/products/query?search=${search}&filter=${filter}`
      );
      // updateProducts(response.data.products);
      console.log(response.data);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="search">
        <p className="wip">search feature - work in progress*</p>
        <div className="filter-container">
          <Select passOption={getOption} options={options} />
        </div>
        <div className="input-container">
          <input
            type="search"
            name="search"
            className="search-input"
            placeholder={`search ${searchBy && `by ${searchBy}`}`}
            {...register("search")}
          />
          {filterType && (
            <div className="filter-type">
              <p>{filterType}</p>
            </div>
          )}
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

const mapActionsToProps = dispatch=>({
  updateProducts: (products) => dispatch(updateProducts(products))
})

export default connect(null, mapActionsToProps)(Search);
