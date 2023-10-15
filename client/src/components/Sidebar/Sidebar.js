import React from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import { Link } from 'react-router-dom';
import { navMenu } from '../../resources/dataNavbarMenu';

const Sidebar = ({ sideBar, setSideBar }) => {
  return (
    <div>
      <div className={`navbar-menu ${sideBar ? 'active' : ''}`}>
        <div className={`navbar-close ${sideBar ? 'active' : ''}`}>
          <Hamburger
            toggled={sideBar}
            toggle={setSideBar}
            rounded
            size={18}
            distance='sm'
          />
        </div>
        <div className='navbar-menulist'>
          <div className='navbar-link'>
            <nav>
              {navMenu.map((navTitle, index) => (
                <Link
                  key={index}
                  to={navTitle.href}
                  className='sidebar-link'
                  onClick={(prevSideBar) => setSideBar(!prevSideBar)}
                >
                  {navTitle.icon}
                  <span>{navTitle.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
