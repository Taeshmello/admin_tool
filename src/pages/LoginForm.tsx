import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './LoginForm.css'; 
import { useNavigate } from 'react-router-dom';

type FormValues = {
  id: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("로그인 성공!");
        navigate('/mainpage'); // 로그인 성공 시 메인 페이지로 이동
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
            <label htmlFor="id">ID</label><br />
            <input
              id="id"
              type="text" 
              {...register("id", { required: "ID를 입력해주세요." })}
              className={`input`}
            />
            {errors.id && <p className="error-message">{errors.id.message}</p>}
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
