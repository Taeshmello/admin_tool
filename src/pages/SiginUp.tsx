import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './SiginUp.css'; 
import { useNavigate } from 'react-router-dom';

type FormValues = {
  id: string;
  password: string;
  email: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('Submitting data:', data); // 데이터 확인용 로그
    try {
      const response = await fetch("http://localhost:5000/auth/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      console.log('Response status:', response.status); // 응답 상태 확인용 로그
  
      if (response.ok) {
        alert("데이터가 성공적으로 전송되었습니다.");
        navigate('/');
      } else {
        const errorText = await response.text();
        alert(`데이터 전송에 실패했습니다. 서버 응답: ${errorText}`);
      }
    } catch (error) {
      alert("라우터 접근에 문제가 있습니다.");
    }
  };
  

  return (
    <div className='form-container'>
      <div className="login-container">
        <h2 className="login-title">Admin tool</h2>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="input-group">
            <label htmlFor="id">ID</label><br />
            <input
              id="id"
              type="text" 
              {...register("id", { required: "ID를 입력해주세요." })}
              className="input"
            />
            {errors.id && <p className="error-message">{errors.id.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label><br />
            <input
              id="password"
              type="password"
              {...register("password", { 
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: passwordRegex,
                  message: "비밀번호는 최소 8자, 문자, 숫자, 특수문자(!@#)를 포함해야 합니다."
                }
              })}
              className="input"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label><br />
            <input
              id="email"
              type="email" 
              {...register("email", { required: "이메일을 입력해주세요." })}
              className="input"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className='signUpContainer'>
            <a href="/" className='/'>이미 계정이 있나요? 로그인</a>
          </div>

          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
