import './SideBar.css';
import { memo } from 'react';

const SideBar = () => {
  return (
    <div className='MainPage-container'>
      <aside className="sidebar">
        <header><h3>admin_tool</h3></header>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <span>user_management</span>
              <ul>
                <li>
                  <a>권한</a>
                </li>
              </ul>
            </li>
            <li>
              <span>forum_management</span>
              <ul>
                <li>
                  <a>게시판 글 관리</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default memo(SideBar);
