import { Button, Form } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from './routes.js';
import avatar from '/avatar.jpg';
import useAuth from '../slices/authSlice.js';

const Login = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginApi(), values);
        localStorage.setItem('token', res.data.token);
        auth.logIn();
        const from = location.state?.from || routes.chatPage();
        navigate(from, { replace: true });
      } catch (err) {
        setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  return (
    <div className='bg-light min-vh-100'>
      <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
        <div className='container'>
          <a className='navbar-brand' href={routes.chatPage()}>Hexlet Chat</a>
        </div>
      </nav>
            <div className='container-fluid vh-100 d-flex align-items-center justify-content-center bg-light'>
              <div className='row justify-content-center w-100'>
                <div className='col-12 col-md-10 col-lg-8 col-xl-6'>
                  <div className='card shadow-sm'>
                    <div className='row g-0'>
                      <div className='col-md-6 d-flex align-items-center justify-content-center p-4'>
                        <img src={avatar} className="img-fluid rounded-circle" alt="Avatar" />
                      </div>
                      <div className='col-md-6 p-4'>
                      <Form onSubmit={formik.handleSubmit}>
                        <h1 className='text-center mb-4'>Войти</h1>
                          <Form.Group className="form-floating mb-3">
                            <Form.Control
                              onChange={formik.handleChange}
                              value={formik.values.username}
                              name='username'
                              autoComplete='username'
                              required
                              placeholder='Ваш ник'
                              id='username'
                              className='form-control'
                              isInvalid={authFailed}
                              ref={inputRef}
                            />
                            <label htmlFor="username">Ваш ник</label>
                          </Form.Group>
                          <Form.Group className="form-floating mb-4">
                            <Form.Control
                              type="password"
                              onChange={formik.handleChange}
                              value={formik.values.password}
                              name='password'
                              autoComplete='current-password'
                              required
                              placeholder='Пароль'
                              id='password'
                              className='form-control'
                              isInvalid={authFailed}
                            />
                            <label htmlFor="password">Пароль</label>
                            <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                          </Form.Group>
                          
                          <Button type='submit' className='w-100' disabled={formik.isSubmitting}>Войти</Button>
                      </Form>
                      </div>
                    </div>
                    <div className='card-footer p-4'>
                      <div className='text-center'>
                        <span>Нет аккаунта?</span>
                        <a href={routes.signUpPage()}>Регистрация</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default Login;
