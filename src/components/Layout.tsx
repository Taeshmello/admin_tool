import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import './Layout.css'; 

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
