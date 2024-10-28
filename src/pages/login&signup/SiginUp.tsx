import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SignUpStyle from './SiginUp.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    try {
      const response = await axios.post("http://localhost:5000/auth/send", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert('Signup success');
        navigate('/');
      } else {
        alert(`Signup failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup.');
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
              {...register("id", { required: "Please enter an id." })}
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
                required: "Please enter your Password.",
                pattern: {
                  value: passwordRegex,
                  message: "Password must contain at least 8 characters, letters, numbers, and special characters (!@#)."
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
              {...register("email", { required: "Please enter your email." })}
              className={SignUpStyle.input}
            />
            {errors.email && <p className={SignUpStyle.errorMessage}>{errors.email.message}</p>}
          </div>

          <div className={SignUpStyle.signUpContainer}>
            <h4 ><a href="/" className={SignUpStyle.siginIn}>Do you already have an account?</a></h4>
            
          </div>

          <button type="submit" className={SignUpStyle.loginButton}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
