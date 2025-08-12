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
        `https://intellishop-backend.onrender.com/api/v1/product/search/${values.keyword}`
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
        className="d-flex search-form bg-black"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control  w-72 m-0"
          type="search"
          placeholder="Search Products "
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className="p-2 rounded h-10 w-10 hover:bg-red-600"
          type="Button"
          onClick={handleSubmit}
        >
          <CiSearch className="text-white " />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
