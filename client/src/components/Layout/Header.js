import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import AIsearchInput from "../Form/AIsearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { GoHome } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [toggle, setToggle] = useState(true);
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  const handleClick = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full items-center justify-evenly p-2 gap-2 md:gap-0 font-bold shadow-md ">
        {/* Left - Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-black hover:text-red-600 font-bold text-lg"
          >
            🛒 intelliShop
          </Link>
        </div>

        {/* Middle - Switch + Search */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <label className="switch">
            <input type="checkbox" onClick={handleClick} />
            <span className="slider round" />
          </label>

          <div className="flex-1 md:flex-none max-w-xs w-full">
            {toggle ? <SearchInput /> : <AIsearchInput />}
          </div>
        </div>

        {/* Right - Placeholder / Menu */}
        <div className="flex items-center mt-2 md:mt-0 gap-4">
          <NavLink to="/" className=" flex ">
            <GoHome />
            Home
          </NavLink>

          <Link
            className=" dropdown-toggle flex"
            to={"/categories"}
            data-bs-toggle="dropdown"
          >
            <BiCategory />
            Categories
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="pl-4 flex mt-1" to={"/categories"}>
                All Categories
              </Link>
            </li>
            {categories?.map((c) => (
              <li>
                <Link className="pl-4 flex mt-1" to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          {!auth?.user ? (
            <>
              <li className="nav-item flex">
                <NavLink to="/register" className="pr-4 flex mt-1">
                  <MdOutlineAccountCircle />
                  Register
                </NavLink>
              </li>
              <li className="nav-item flex">
                <NavLink to="/login" className="pr-4 flex mt-1">
                  <IoMdLogIn />
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item dropdown flex">
                <NavLink
                  className=" dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ border: "none" }}
                >
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}
          <div className="mr-8">
            <NavLink to="/cart ">
              <Badge count={cart?.length} showZero offset={[10, -5]}>
                Cart
              </Badge>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
