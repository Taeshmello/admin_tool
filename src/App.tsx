import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import MainPage from './pages/MainPage';
import Layout from './components/Layout';
import UserManage from './pages/UserManage';
import ForumManage from './pages/ForumManage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      {/* Layout 안에 Header와 SideBar가 포함됨 */}
      <Route element={<Layout />}>
        <Route path="mainpage" element={<MainPage />} />
        <Route path="userManage" element={<UserManage />} />
        <Route path="ForumManage" element={<ForumManage/>} />
      </Route>
    </Routes>
  );
}

export default App;
