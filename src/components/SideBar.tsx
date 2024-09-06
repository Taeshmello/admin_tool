import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleNavItemClick = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <div className="sidebar-container">
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item" onClick={() => handleNavItemClick(1)}>
            <span className="nav-text">사용자 관리</span>
            {activeItem === 1 && (
              <ul className="sub-menu">
                <li>
                  <Link to="/UserManage">사용자 권한</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item" onClick={() => handleNavItemClick(2)}>
            <span className="nav-text">커뮤니티 관리</span>
            {activeItem === 2 && (
              <ul className="sub-menu">
                <li>
                  <Link to="/ForumManage">게시판 글 관리</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
