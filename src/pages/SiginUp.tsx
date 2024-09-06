import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './SiginUp.css'; 
import { useNavigate } from 'react-router-dom';

type FormValues = {
  id: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const storedId = localStorage.getItem('id') || 'test';
  const storedPassword = localStorage.getItem('password') || '1234';

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (data.id === storedId && data.password === storedPassword) {
      navigate('/mainpage');
      console.log(data);
    } else {
      alert('ID 또는 비밀번호가 올바르지 않습니다.');
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
              {...register("password", { required: "비밀번호를 입력해주세요." })}
              className="input"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            {errors?.password?.type === 'pattern' && <p className='error-message'>{errors.password.message}</p>}
          </div>

          <div className='signUpContainer'>
            <a href="signin" className='/'>이미 계정이 있나요? 로그인</a>
          </div>

          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
