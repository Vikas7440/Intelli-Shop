import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://intelli-shop-server.vercel.app/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2" style={{ backgroundColor: 'rgb(252 248 246)', width: '350px', margin: '0px !important' }}
          type="search"
          placeholder="Search Products "
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <div className="newButton" type='Button' onClick={handleSubmit} style={{ backgroundColor: "blue" }}>
          <CiSearch />

        </div>
      </form>
    </div>
  );
};

export default SearchInput;
