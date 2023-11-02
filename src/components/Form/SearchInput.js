import React from "react";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../Context/search";

const SearchInput = () => {
  const [values, setVAlues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-search/${values.keyword}`
      );
      setVAlues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
      NotificationManager.error(
        "Something went wrong while searching product",
        "Error"
      );
    }
  };
  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-4"
          type="values"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setVAlues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
