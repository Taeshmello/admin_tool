import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginStyle from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { refreshAccessToken, userStatusCheck } from '../../utils/api';

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
        await refreshAccessToken(setCookie);
        const statusResponse = await userStatusCheck();
        if (statusResponse) {
          const { UserStatus } = statusResponse;
          if (UserStatus === 0) {
            navigate('/waiting');
          } else if (UserStatus === 1) {
            navigate('/mainpage');
          } else if (UserStatus === 2) {
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
    <div className={LoginStyle.formContainer}>
      <div className={LoginStyle.loginContainer}>
        <h2 className={LoginStyle.loginTitle}>Admin tool</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={LoginStyle.loginForm}>
          <div className={LoginStyle.inputGroup}>
            <label htmlFor="email">Email</label><br />
            <input
              id="email"
              type="text"
              {...register("email", { required: "email를 입력해주세요." })}
              className={LoginStyle.input}
            />
            {errors.email && <p className={LoginStyle.errorMessage}>{errors.email.message}</p>}
          </div>

          <div className={LoginStyle.inputGroup}>
            <label htmlFor="password">Password</label><br />
            <input
              id="password"
              type="password"
              {...register("password", { required: "비밀번호를 입력해주세요." })}
              className={LoginStyle.input}
            />
            {errors.password && <p className={LoginStyle.errorMessage}>{errors.password.message}</p>}
          </div>

          <div className={LoginStyle.signUpContainer}>
            <a href="signup" className={LoginStyle.signup}>회원가입</a>
          </div>

          <button type="submit" className={LoginStyle.loginButton}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;