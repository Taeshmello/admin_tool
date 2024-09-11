import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { dropdownAtom } from '../state/atoms';
import { useCookies } from 'react-cookie';
import { fetchData, refreshAccessToken, logout } from '../utils/api';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useAtom(dropdownAtom);
  const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  // 컴포넌트가 마운트될 때 유저 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      if (!cookies.accessToken) {
        // Access Token이 없을 때 Refresh Token으로 갱신
        await refreshAccessToken(setCookie);
      }

      if (cookies.accessToken) {
        // 쿠키에 저장된 Access Token을 fetchData 함수에 전달
        const userData = await fetchData(cookies.accessToken);
        setUserInfo(userData); // 유저 정보 저장  
      }
    };



    fetchUser();
  }, [cookies, setCookie]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(removeCookie);
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="title"><a href="/mainpage">VFUN-Admin</a></span>

      </div>

      <div className="header-right">
        <select className="language-select">
          <option value="kr">Korean</option>
          <option value="en">English</option>
          <option value="cn">Chinese</option>
        </select>

        <div className="profile-container" onClick={toggleDropdown}>
          <img src="/asset/profile.jpg" className="profile-icon" alt="Profile" />

          {/* 유저 이름 표시 */}


          {isDropdownOpen && (
            <div className="dropdown-menu">
              {userInfo ? (

                <div className='profileName-container'><span className="profile-name">{userInfo.name}님</span></div>
              ) : (
                <span>Loading...</span>
              )}
              <div className='logoutBtn-container'><button className="logout-button" onClick={handleLogout}>로그아웃</button></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
