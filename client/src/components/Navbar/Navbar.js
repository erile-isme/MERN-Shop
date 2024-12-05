import React, { useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Badge from "@mui/material/Badge";
import Search from "../Search/Search";
import Sidebar from "./Sidebar";
import "./styles.css";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  // const [cart, setCart] = useState(false);
  // const [login, setLogin] = useState(false);
  // const [fav, setFav] = useState(false);

  const showSideBar = () => {
    setSideBar(!sideBar);
  };
  return (
    <div>
      <div className='navbar-container'>
        <div className={`navbar-right ${sideBar ? 'active' : ''}`}>
          {/* <div className='navbar-right'> */}
          <Hamburger
            rounded
            size={18}
            toggle={setSideBar}
            toggled={sideBar}
            distance='sm'
          />
        </div>
        <div className='brandname'>
          <Link to='/'>eri.</Link>
        </div>
        <div className='navbar-left'>
          <div className='navbar-search'>
            <div>{search && <Search />}</div>
            <SearchOutlinedIcon onClick={() => setSearch(!search)} />
          </div>
          <Link to='/cart'>
            <Badge
              color='primary'
              badgeContent={0}
              showZero
              overlap='rectangular'
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
          <Link to='/login'>
            <PersonOutlineOutlinedIcon />
          </Link>
        </div>
      </div>

      {sideBar ? <Sidebar sideBar={sideBar} setSideBar={showSideBar} /> : <></>}
    </div>
  );
};

export default Navbar;
