import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //slide image
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "images/sale6.jpg",
    "images/sale7.jpg",
    "images/sale8.jpg",
    "images/sale9.jpg",
    "images/sale10.jpg",
    "images/sale11.jpg",
    "images/sale12.jpg",
    "images/sale13.jpg",
    "images/sale.jpg",
    // Add more image paths here
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % images.length);
    }, 5000); // Change slide every 5  seconds

    return () => clearInterval(interval);
  }, [currentSlide, images.length]);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={"ALl Products - Best offers "}>
      <div className="box">
      </div>
      {/* banner image */}
      <img src="/images/6.jpg" className="imges"></img>
      <div className="disp">
        <h1 style={{ color: "blue", fontSize: "4rem" }}>Introducing BAZAAR</h1>
        <div className="intro">World's first description based product searching website</div><div className="introd">we understand your feelings !!!!</div>
      </div>
      {/* slide image 
      <div className="container">
        <div className=" row col carousel" style={{ left: "15% " }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                display: index === currentSlide ? "block" : "none", height: "250px", width: "70%", borderRadius: "10px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, .5), 0 6px 20px 0 rgba(0, 0, 0, 0.30)"
              }}
            />
          ))}
        </div>
      </div>*/}
      <div style={{ display: "flex", flexWrap: "wrap", margin: "5%", justifyContent: "space-between" }}>
        <div className="carrd">
          <img className="card-img-top" src="/images/watch1.jpg" alt="Card image cap" style={{ height: "15rem" }} />
          <div className="card-body">
            <h5 className="card-title"> Watches </h5>
            <p className="card-text">"Introducing the Classic Timepiece watch: Timeless Elegance Redefined. Elevate your style with our meticulously crafted watch. Premium materials, impeccable design. Order now!"</p>
          </div>
        </div>
        <div className="carrd">
          <img className="card-img-top" src="/images/shoe2.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Shoes Collection</h5>
            <p className="card-text">"Discover the perfect fit for every occasion. Step up your style game with our latest shoe collection."</p>
          </div>
        </div>
        <div className="carrd">
          <img className="card-img-top" src="/images/teady.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Toys Collection</h5>
            <p className="card-text">
              "Embrace warmth and comfort with our cuddly teddy bears. Handcrafted with care, each bear is a symbol of love and companionship. Whether for a special occasion or simply to spread cheer, our teddies are always there for a warm embrace."</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", margin: "5%", justifyContent: "space-between" }}>
        <div className="carrd">
          <img className="card-img-top" src="/images/sandle.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Sandles</h5>
            <p className="card-text">"Step into style and comfort with our latest collection of women's sandals and shoes. Find your perfect pair today and stride with confidence."</p>
          </div>
        </div>
        <div className="carrd">
          <img className="card-img-top" src="/images/dress3.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Mens Collection</h5>
            <p className="card-text">"Dress to impress with our stylish men's outfits. From casual wear to formal attire, elevate your wardrobe with our curated collection. Find the perfect ensemble to suit any occasion."</p>
          </div>
        </div>
        <div className="carrd">
          <img className="card-img-top" src="/images/mobile.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">MObile Phone</h5>
            <p className="card-text">"Explore our range of top-notch smartphones, blending innovation and style seamlessly. Stay ahead of the curve with our cutting-edge mobile technology.</p>
          </div>
        </div>
      </div>



      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters " style={{ backgroundColor: "#FEE" }}>
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              style={{ background: "#f57b59", margin: "5px" }}
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <div className="product">All Products</div>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id} style={{ maxHeight: "1000px" }}>
                <img
                  src=
                  {`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body ">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout >

  );
};

export default HomePage;
