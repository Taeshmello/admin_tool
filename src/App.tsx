import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
import UserManage from './pages/UserManage';
import ForumManage from './pages/Forumanage/ForumManage';
import FaqManage from './pages/FAQ/FaqManage';
import SiginUp from './pages/SignUp/SiginUp';
import Department from './pages/Department/Department';
import Category from './pages/Category/Category';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { refreshAccessToken } from './utils/api'; // Access Token 갱신 함수 import
import Waiting from './pages/Waiting';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  // Access Token 갱신을 주기적으로 수행
  useEffect(() => {
    const interval = setInterval(async () => {
      if (cookies.accessToken) {
        // 토큰이 존재할 때 갱신 시도
        await refreshAccessToken(setCookie);
      }
    }, 14 * 60 * 1000); // 14분마다 실행 (15분 만료 기준)

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [cookies.accessToken, setCookie, removeCookie]);
  
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path='signup' element={<SiginUp />} />
        <Route path='waiting' element={<Waiting/>}/>
        <Route element={<Layout />}>
          <Route path="mainpage" element={<MainPage />} />
          <Route path="userManage" element={<UserManage />} />
          <Route path="ForumManage" element={<ForumManage />} />
          <Route path='faqmanage' element={<FaqManage />} />
          <Route path='Category' element={<Category/>}/>
          <Route path='Department' element={<Department/>}/>
        </Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
