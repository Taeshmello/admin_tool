import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
import UserManage from './pages/UserManage';
import ForumManage from './pages/ForumManage';
import FaqManage from './pages/FaqManage';
import SiginUp from './pages/SiginUp';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { refreshAccessToken } from './utils/api'; // Access Token 갱신 함수 import

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  // Access Token 갱신을 주기적으로 수행
  useEffect(() => {
    const interval = setInterval(async () => {
      if (cookies.accessToken) {
        // 토큰이 존재할 때 갱신 시도
        await refreshAccessToken(setCookie, removeCookie);
      }
    }, 14 * 60 * 1000); // 14분마다 실행 (15분 만료 기준)

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [cookies.accessToken, setCookie, removeCookie]);

  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path='signup' element={<SiginUp />} />
        <Route element={<Layout />}>
          <Route path="mainpage" element={<MainPage />} />
          <Route path="userManage" element={<UserManage />} />
          <Route path="ForumManage" element={<ForumManage />} />
          <Route path='faqmanage' element={<FaqManage />} />
        </Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
