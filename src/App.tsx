import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
import UserManage from './pages/UserManage';
import ForumManage from './pages/ForumManage';
import FaqManage from './pages/FaqManage';
import SiginUp from './pages/SiginUp';
import Department from './pages/Department';
import Category from './pages/Category';
import { CookiesProvider} from 'react-cookie';

import Waiting from './pages/Waiting';

function App() {
  
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
