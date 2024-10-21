import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { dropdownAtom } from '../atoms/atoms';
import { useCookies } from 'react-cookie';
import { fetchData, refreshAccessToken, logout } from '../utils/api';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useAtom(dropdownAtom);
  const [userInfo, setUserInfo] = useState<{ name: string } | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const { t, i18n } = useTranslation();

  

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!cookies.accessToken) {
          await refreshAccessToken(setCookie);
        }

        if (cookies.accessToken) {
          const userData = await fetchData(cookies.accessToken);
          setUserInfo(userData);
        }
      } catch (error) {
        console.error("유저 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUser();
  }, [cookies.accessToken, setCookie, removeCookie]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(removeCookie);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage)
      .then(() => {
        localStorage.setItem('language', selectedLanguage);
      })
      .catch((error) => {
        console.error("언어 변경 중 오류 발생:", error);
      });
};
  return (
    <header className="header">
      <div className="header-left">
        <span className="title"><a href="/mainpage">VFUN-Admin</a></span>
      </div>

      <div className="header-right">
        <select className="language-select" onChange={handleLanguageChange} value={i18n.language}>
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="cn">中文</option>  
        </select>

        <div className="profile-container" onClick={toggleDropdown}>
          <img src="/asset/profile.jpg" className="profile-icon" alt="Profile" />

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {userInfo ? (
                <div className='profileName-container'><span className="profile-name">{userInfo.name}</span></div>
              ) : (
                <span>Loading...</span>
              )}
              <div className='logoutBtn-container'><button className="logout-button" onClick={handleLogout}>{t('logout')}</button></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
