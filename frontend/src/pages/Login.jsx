import { Button, Form } from 'react-bootstrap'
import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import routes from '../utils/routes.js'
import avatar from '/avatar.jpg'
import useAuth from '../store/useAuth.jsx'

const Login = () => {
  const { t } = useTranslation()
  const auth = useAuth()
  const [authFailed, setAuthFailed] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false)
      try {
        const res = await axios.post(routes.loginApi(), values)
        localStorage.setItem('token', res.data.token)
        auth.logIn(res.data.token, res.data.username)
        const from = location.state?.from || routes.chatPage()
        navigate(from)
      }
      catch (err) {
        formik.setSubmitting(false)
        if (axios.isAxiosError(err) && err.response.status === 401) {
          setAuthFailed(true)
          inputRef.current.select()
          return
        }
        throw err
      }
    },
  })

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow-sm">
            <div className="row g-0">
              <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
                <img src={avatar} className="img-fluid rounded-circle" alt="Avatar" />
              </div>
              <div className="col-md-6 p-4">
                <Form onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('loginForm.title')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      name="username"
                      autoComplete="username"
                      required
                      placeholder="Ваш ник"
                      id="username"
                      className="form-control"
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                    <label htmlFor="username">{t('loginForm.username')}</label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder="Пароль"
                      id="password"
                      className="form-control"
                      isInvalid={authFailed}
                    />
                    <label htmlFor="password">{t('loginForm.password')}</label>
                    <Form.Control.Feedback type="invalid">{t('loginForm.error')}</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" className="w-100" variant="outline-primary" disabled={formik.isSubmitting}>{t('loginForm.title')}</Button>
                </Form>
              </div>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginForm.span')}</span>
                <a href={routes.signUpPage()}>{t('loginForm.registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
