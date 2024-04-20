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
            const { data } = await axios.post("http://localhost:8080/api/v1/product/aifilter", {
                keyword: values.keyword
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
                className="d-flex search-form"
                role="search"
                onSubmit={handleSubmit}
            >
                <input
                    className="form-control me-2" style={{ backgroundColor: 'rgb(252 248 246)', width: '350px', margin: '0px !important' }}
                    type="search"
                    placeholder="Description....."
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <div className="newButton" type='Button' onClick={handleSubmit}>
                    <CiSearch />
                    <div>
                        {searching && (
                            <div className="search-animation">
                                {/* You can replace this with your own loading animation */}
                                <span style={{
                                    position: "absolute", top: "105px", color: " #f47458", left: "-240px"
                                }}>Searching...</span>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AIsearchInput;
