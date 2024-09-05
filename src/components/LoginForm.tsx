import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './LoginForm.css'; 

type FormValues = {
  id: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
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
          </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
