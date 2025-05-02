import React, { useRef, useState } from "react";
import { Row, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import img from '/avatar_1-D7Cot-zE.jpg';
import signupSchema from '../utils/validate.js';
import routes from '../utils/routes.js';
import useAuth from "../store/useAuth.jsx";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputEl = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema(t),
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      try {
        const { data } = await axios.post(routes.sighUpPath(), { username, password });
        auth.logIn(data.token, data.username);
        navigate(routes.chatPage());
      } catch (err) {
        setSubmitting(false);
        if (err.response.status === 409) {
          setAuthFailed(true);
          inputEl.current.select();
        }
        throw err;
      }
    }
  });
  return (
    <div className="container-fluid pt-5 mt-3">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={img} className="rounded-circle" alt={t('loginForm.registration')} />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('loginForm.registration')}</h1>
                <fieldset>
                  <Form.Group className="form-floating mb-3" controlId="username">
                    <Form.Control
                      className="form-control"
                      placeholder="От 3 до 20 символов"
                      name="username"
                      autoComplete="username"
                      required
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      ref={inputEl}
                      isInvalid={(formik.touched.username
                        && !!formik.errors.username) || authFailed}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Label>{t('signup.username')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3" controlId="password">
                    <Form.Control
                      className="form-control"
                      placeholder="Не менее 6 символов"
                      name="password"
                      aria-describedby="passwordHelpBlock"
                      autoComplete="new-password"
                      required
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      ref={inputEl}
                      isInvalid={(formik.touched.password
                        && !!formik.errors.password) || authFailed}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Label>{t('signup.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                    <Form.Control
                      className="form-control"
                      placeholder="Пароли должны совпадать"
                      name="confirmPassword"
                      aria-describedby="passwordHelpBlock"
                      autoComplete="new-password"
                      required
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      ref={inputEl}
                      isInvalid={(formik.touched.confirmPassword
                        && !!formik.errors.confirmPassword) || authFailed}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {authFailed ? t('signup.existsUser') : formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                    <Form.Label>{t('signup.confirmPassword')}</Form.Label>
                  </Form.Group>
                  <Button type="submit" className="w-100" variant="outline-primary">{t('signup.registration')}</Button>
                </fieldset>
              </Form>
            </div>
          </div>
        </div>
      </Row>
    </div>
  )
};

export default Signup;
