import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
import UserManage from './pages/UserManage';
import ForumManage from './pages/ForumManage';
import FaqManage from './pages/FaqManage';
import SiginUp from './pages/SiginUp';
import { CookiesProvider } from 'react-cookie';

function App() {
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
