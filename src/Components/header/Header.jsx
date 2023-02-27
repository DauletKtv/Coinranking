import "./header.css";
import React from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { useState } from "react";
// import './appHeader.scss';
import { useLocation } from "react-router-dom";
const Header = (props) => {
  const navigate = useNavigate();
  let activeClassName = "active-link";
  const [searchInput, setSearchInput] = useState("");
  const needNavigate = (e) => {
    if (e == "") {
      console.log("Пустая строка");
    } else {
      navigate(`/search/${searchInput}`);
    }
  };
  return (
    <header className="app__header fixed flex items-center z-50 justify-between">
      <NavLink
        // activeClassName="active-link"
        // className={({ isActive }) => (isActive ? activeClassName : undefined)}
        to="/"
      >
        <div className="flex z-10">
          <img
            src="https://rapidapi.com/cdn/images?url=https://rapidapi-prod-apis.s3.amazonaws.com/c3736925-9c98-4fdc-857e-07c11146afb7.png"
            className="w-6 h-6"
          />
          <h1 className="app__title">Coinranking</h1>
        </div>
      </NavLink>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          props.setSearch(searchInput);
          needNavigate(searchInput);

          console.log(searchInput);
        }}
      >
        <input
          type="text"
          placeholder="Search Coin"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </form>
      <nav className="app__menu ">
        <ul className="flex gap-10">
          <li>
            <NavLink
              index
              to="/"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Main
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              activeClassName="active-link"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
              to="/search"
            >
              Поиск
            </NavLink>
          </li> */}
          <li>
            <NavLink
              activeClassName="active-link"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
              to="/collection"
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
