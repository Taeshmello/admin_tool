import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/login&signup/LoginForm';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
import UserManage from './pages/userManage/UserManage';
import ForumManage from './pages/community/ForumManage';
import FaqManage from './pages/faq/FaqManage';
import SiginUp from './pages/login&signup/SiginUp';
import Department from './pages/department/Department';
import Category from './pages/category/Category';
import ForumMenuManage from './pages/community/ForumMenuManage';
import { CookiesProvider } from 'react-cookie';

import Waiting from './pages/wait/Waiting';

function App() {

  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path='signup' element={<SiginUp />} />
        <Route path='waiting' element={<Waiting />} />
        <Route element={<Layout />}>
          <Route path="mainpage" element={<MainPage />} />
          <Route path="userManage" element={<UserManage />} />
          <Route path='ForumMenuManage' element={<ForumMenuManage />} />
          <Route path="ForumManage" element={<ForumManage />} />
          <Route path='faqmanage' element={<FaqManage />} />
          <Route path='Category' element={<Category />} />
          <Route path='Department' element={<Department />} />
        </Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
