import React from "react";
import { useSearch } from "../../context/search";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const AIsearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSearching(true);
      const { data } = await axios.post(
        "https://intellishop-backend.onrender.com/api/v1/product/aifilter",
        {
          keyword: values.keyword,
        }
      );
      setValues({ ...values, results: data });
      navigate("/search");
      setSearching(false);
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
          className="form-control w-72 m-0"
          type="search"
          placeholder="Description....."
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
          <div>
            {searching && (
              <div className="search-animation">
                {/* You can replace this with your own loading animation */}
                <span
                  style={{
                    position: "absolute",
                    top: "105px",
                    color: " #f47458",
                    left: "-240px",
                  }}
                >
                  Searching...
                </span>
              </div>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default AIsearchInput;
