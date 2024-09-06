import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import './Layout.css'; // 필요시 레이아웃 관련 CSS 추가

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-main">
        <SideBar />
        <div className="layout-content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Layout;
