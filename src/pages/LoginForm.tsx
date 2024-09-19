import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { refreshAccessToken, userStatusCheck } from '../utils/api';

type FormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
      
        alert("로그인 성공!");

        // 액세스 토큰을 새로 고치고 쿠키를 설정합니다.
        await refreshAccessToken(setCookie);

        // 사용자 상태 확인
        const statusResponse = await userStatusCheck();
        if (statusResponse) {
          const { UserStatus } = statusResponse;

          

          if (UserStatus === 0) {
            // 상태가 0일 경우 Waiting 페이지로 이동
            navigate('/waiting')
          } else if (UserStatus === 1) {
            // 상태가 1일 경우 메인 페이지로 이동
            navigate('/mainpage');
          } else if (UserStatus === 2) {
            // 상태가 2일 경우 로그인 불가 알림
            alert("로그인할 수 없습니다.");
          }
        }
      } else {
        alert("ID 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className='form-container'>
      <div className="login-container">
        <h2 className="login-title">Admin tool</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="input-group">
            <label htmlFor="email">email</label><br />
            <input
              id="email"
              type="text"
              {...register("email", { required: "email를 입력해주세요." })}
              className={`input`}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label><br />
            <input
              id="password"
              type="password"
              {...register("password", { required: "비밀번호를 입력해주세요." })}
              className={`input`}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div className='signUpContainer'>
            <a href="signup" className='signup'>회원가입</a>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
