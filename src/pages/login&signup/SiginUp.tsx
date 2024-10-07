import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SignUpStyle from './SiginUp.module.css';
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
    console.log('Submitting data:', data);
    try {
      const response = await fetch("http://localhost:5000/auth/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);

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
    <div className={SignUpStyle.formContainer}>
      <div className={SignUpStyle.loginContainer}>
        <h2 className={SignUpStyle.loginTitle}>Admin tool</h2>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={SignUpStyle.loginForm}>
          <div className={SignUpStyle.inputGroup}>
            <label htmlFor="id">ID</label><br />
            <input
              id="id"
              type="text"
              {...register("id", { required: "ID를 입력해주세요." })}
              className={SignUpStyle.input}
            />
            {errors.id && <p className={SignUpStyle.errorMessage}>{errors.id.message}</p>}
          </div>

          <div className={SignUpStyle.inputGroup}>
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
              className={SignUpStyle.input}
            />
            {errors.password && <p className={SignUpStyle.errorMessage}>{errors.password.message}</p>}
          </div>

          <div className={SignUpStyle.inputGroup}>
            <label htmlFor="email">Email</label><br />
            <input
              id="email"
              type="email"
              {...register("email", { required: "이메일을 입력해주세요." })}
              className={SignUpStyle.input}
            />
            {errors.email && <p className={SignUpStyle.errorMessage}>{errors.email.message}</p>}
          </div>

          <div className={SignUpStyle.signUpContainer}>
            <h4>이미 계정이 있나요?</h4>
            <a href="/" className={SignUpStyle.login}> 로그인</a>
          </div>

          <button type="submit" className={SignUpStyle.loginButton}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;