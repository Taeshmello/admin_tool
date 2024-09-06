import React from 'react';
import { useAtom } from 'jotai';
import { dropdownAtom } from '../state/atoms'; // jotai 상태 관리 atom
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useAtom(dropdownAtom);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="title">Admin Tool</span>
      </div>

      <div className="header-right">
        <div className="profile-container" onClick={toggleDropdown}>
        <img src="/asset/profile.jpg" className="profile-icon" />

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="logout-button">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
