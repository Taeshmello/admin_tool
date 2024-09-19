import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { dropdownAtom } from '../atoms/atoms';
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
      try {
        if (!cookies.accessToken) {
          // Access Token이 없을 때 Refresh Token으로 갱신
          await refreshAccessToken(setCookie);
        }

        // Access Token이 있는 경우에만 유저 정보 요청
        if (cookies.accessToken) {
          const userData = await fetchData(cookies.accessToken);
          setUserInfo(userData); // 유저 정보 저장  
        }
      } catch (error) {
        console.error("유저 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUser();
  }, [cookies.accessToken, setCookie, removeCookie]); // accessToken만 의존성 배열에 포함

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
