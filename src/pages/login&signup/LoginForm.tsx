import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginStyle from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
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
      const response = await axios.post("http://localhost:5000/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        await refreshAccessToken(setCookie);
        const statusResponse = await userStatusCheck();
        if (statusResponse) {
          const { UserStatus } = statusResponse;
          if (UserStatus === 0) {
            navigate('/waiting');
          } else if (UserStatus === 1) {
            navigate('/userManage');
          } else if (UserStatus === 2) {
            alert("Unable to log in.");
          }
        }
      } else {
        alert("The ID or password is not valid.");
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("There was a problem communicating with the server.");
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
              {...register("email", { required: "Please enter an email." })}
              className={LoginStyle.input}
            />
            {errors.email && <p className={LoginStyle.errorMessage}>{errors.email.message}</p>}
          </div>

          <div className={LoginStyle.inputGroup}>
            <label htmlFor="password">Password</label><br />
            <input
              id="password"
              type="password"
              {...register("password", { required: "Please enter your password." })}
              className={LoginStyle.input}
            />
            {errors.password && <p className={LoginStyle.errorMessage}>{errors.password.message}</p>}
          </div>

          <div className={LoginStyle.signUpContainer}>
            <a href="signup" className={LoginStyle.signup}>Sign Up</a>
          </div>

          <button type="submit" className={LoginStyle.loginButton}>Login</button>
          
        </form>
        
      </div>
      {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className={`${LoginStyle.star} ${LoginStyle[`star${index}`]}`}></div>
            ))}
    </div>
  );
};

export default LoginForm;
