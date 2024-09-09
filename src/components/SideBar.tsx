// SideBar.tsx
import React, { useState } from 'react';
import './SideBar.css';

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleNavItemClick = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h3>menu</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
        <li className="nav-item">
            <span className="nav-text"><a href="mainpage">VALOFE ADMIN TOOL</a></span>
          </li>
          
        <li className="nav-item">
            <span className="nav-text"><a href="userManage">사용자 관리</a></span>
          </li>
          
          <li className="nav-item" onClick={() => handleNavItemClick(1)}>
            <span className="nav-text">고객센터 관리</span>
            {activeItem === 1 && (
              <ul className="sub-menu">
                <li><a href="faqmanage">FAQ 관리</a></li>
              </ul>
            )}
          </li>
          <li className="nav-item" onClick={() => handleNavItemClick(2)}>
            <span className="nav-text">메인화면 관리</span>
            {activeItem === 2 && (
              <ul className="sub-menu">
                <li><a href="ForumManage">게시판 글 관리</a></li>
              </ul>
            )}
          </li>
        </ul>
       
      </nav>
    </div>
  );
};

export default SideBar;
