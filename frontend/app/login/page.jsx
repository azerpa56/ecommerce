"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { apiEndpoints as apiEndPoint } from "../../config/api.js";

const LoginRegisterForm = () => {
  const router = useRouter();
  
  // Effect Card Translate
    const [isLogin, setIsLogin] = useState(true);
  
    const flipCard = () => {
      setIsLogin(!isLogin);
    };

    // Effect See Password

    const [isSee, setSee] = useState(false)

    const seePassword = () => {
      setSee(!isSee);
    }

    // Login state
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginMessage, setLoginMessage] = useState('')
    const [loginMessageType, setLoginMessageType] = useState('')
    const [isLoginSubmitting, setIsLoginSubmitting] = useState(false)

    // Register state
    const [registerFirstName, setRegisterFirstName] = useState('')
    const [registerLastName, setRegisterLastName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState('')
    const [registerRole, setRegisterRole] = useState('user')
    const [registerMessage, setRegisterMessage] = useState('')
    const [registerMessageType, setRegisterMessageType] = useState('')
    const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false)

    const calculatePasswordStrength = (password) => {
      let strength = 0;
      if (password.length > 5) strength++;
      if (password.match(/[a-z]/)) strength++;
      if (password.match(/[A-Z]/)) strength++;
      if (password.match(/[0-9]/)) strength++;
      if (password.match(/[^a-zA-Z0-9]/)) strength++;
      return strength;
    };
  
    const passwordStrength = calculatePasswordStrength(registerPassword);

    const handleLoginSubmit = async (event) => {
      event.preventDefault()
      setLoginMessage('')
      setLoginMessageType('')
      setIsLoginSubmitting(true)

      try {
        const response = await fetch(apiEndPoint.auth.signin, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Error al iniciar sesion')
        }

        if (data.token) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify({
            id: data.id,
            email: data.email,
            roles: data.roles
          }))

          setLoginMessage('Login exitoso')
          setLoginMessageType('success')
          
          // Redirigir al home después de 500ms
          setTimeout(() => {
            router.push('/')
          }, 500)
        } else {
          throw new Error('Respuesta invalida del servidor')
        }
      } catch (error) {
        setLoginMessage(error.message)
        setLoginMessageType('error')
      } finally {
        setIsLoginSubmitting(false)
      }
    }

    const handleRegisterSubmit = async (event) => {
      event.preventDefault()
      setRegisterMessage('')
      setRegisterMessageType('')
      setIsRegisterSubmitting(true)

      if (registerPassword !== registerRepeatPassword) {
        setRegisterMessage('Las contrasenas no coinciden')
        setRegisterMessageType('error')
        setIsRegisterSubmitting(false)
        return
      }

      try {
        const fullName = `${registerFirstName} ${registerLastName}`.trim()
        const rolePayload = registerRole === 'admin' ? ['admin'] : ['user']

        const response = await fetch(apiEndPoint.auth.signup, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: registerEmail,
            password: registerPassword,
            fullName,
            address: '',
            role: rolePayload
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Error al registrar usuario')
        }

        setRegisterMessage(data.message || 'Registro exitoso, revisa tu correo para verificar la cuenta')
        setRegisterMessageType('success')
        setRegisterPassword('')
        setRegisterRepeatPassword('')
      } catch (error) {
        setRegisterMessage(error.message)
        setRegisterMessageType('error')
      } finally {
        setIsRegisterSubmitting(false)
      }
    }
  
  
    return (
      <div className={styles.mainLogin}>
        <div className={`${styles.card} ${isLogin ? styles.login : styles.register}`}>
              {/* Login */}
              <form action="#" className={`${styles.front} ${styles.formLogin}`} onSubmit={handleLoginSubmit}>
                  <h2>LOGIN</h2>
                  <div className={styles.formGroup}>
                      <label htmlFor="email"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path></svg></label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                        required
                      />
                  </div>
                  <div className={styles.formGroup}>
                      <label htmlFor="login-password"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM11 14V16H13V14H11ZM7 14V16H9V14H7ZM15 14V16H17V14H15Z"></path></svg></label>
                      <input
                        type={isSee ? "text" : "password"}
                        id="login-password"
                        name="password"
                        placeholder='password'
                        value={loginPassword}
                        onChange={(event) => setLoginPassword(event.target.value)}
                        required
                      />
                      <svg onClick={seePassword} className={isSee ? styles.desactiveSee : styles.activeSee} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path>
                      </svg>
                      <svg onClick={seePassword} className={isSee ? styles.activeSee : styles.desactiveSee} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"></path></svg>
                  </div>
                    <a href="#" id="forgotPassword">Forgot password?</a>
                  <button type="submit" className="btn btn-primary" disabled={isLoginSubmitting}>
                    {isLoginSubmitting ? 'Entrando...' : 'Enter'}
                  </button>
                  {loginMessage && (
                    <p className={`${styles.formMessage} ${loginMessageType === 'error' ? styles.formMessageError : styles.formMessageSuccess}`}>
                      {loginMessage}
                    </p>
                  )}
                <a className={styles.buttonChangeCard} onClick={flipCard}>You have not registered yet?</a>
            </form>

              {/* Register */}
            <form action="#" className={`${styles.back} ${styles.formRegister}`} onSubmit={handleRegisterSubmit}>
                  <h2>REGISTER</h2>
                  <div className={styles.groupRegister}>

                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          aria-describedby="emailHelp"
                          placeholder="Enter name"
                          value={registerFirstName}
                          onChange={(event) => setRegisterFirstName(event.target.value)}
                          required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="lastname">LastName</label>
                        <input
                          type="text"
                          id="lastname"
                          aria-describedby="emailHelp"
                          placeholder="LastName"
                          value={registerLastName}
                          onChange={(event) => setRegisterLastName(event.target.value)}
                          required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email-register">Email</label>
                        <input
                          type="email"
                          id="email-register"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          value={registerEmail}
                          onChange={(event) => setRegisterEmail(event.target.value)}
                          required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="date">Birthdate</label>
                        <input type="date" id="date"/>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="id">I.D <br /> Personal</label>
                        {/* <select name="gender" id="gender">
                              <option value="">V-</option>
                              <option value="male">E-</option>
                              <option value="female">J-</option>
                          </select> */}
                        <input type="text" id="id" placeholder="V-2808......" />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="gender">GENDER</label>
                          <select name="gender" id="gender">
                              <option value="">SELECTION...</option>
                              <option value="male">MALE</option>
                              <option value="female">FEMALE</option>
                              <option value="other">OTHER</option>
                          </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="username">Username</label>
                      <input type='text' id='username' placeholder='Username'/>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="role">Rol</label>
                      <select
                        name="role"
                        id="role"
                        value={registerRole}
                        onChange={(event) => setRegisterRole(event.target.value)}
                      >
                        <option value="user">Cliente</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                       <div className={styles.password}>
                          <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(event) => setRegisterPassword(event.target.value)}
                            required
                          />
                          <progress value={passwordStrength} max="5" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="repeatpassword">Repeat PassWord</label>
                        <input
                          type="password"
                          id="repeatpassword"
                          placeholder="repeatpassword"
                          value={registerRepeatPassword}
                          onChange={(event) => setRegisterRepeatPassword(event.target.value)}
                          required
                        />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={isRegisterSubmitting}>
                    {isRegisterSubmitting ? 'Registrando...' : 'Register'}
                  </button>
                  {registerMessage && (
                    <p className={`${styles.formMessage} ${registerMessageType === 'error' ? styles.formMessageError : styles.formMessageSuccess}`}>
                      {registerMessage}
                    </p>
                  )}
              <a className={styles.buttonChangeCard} onClick={flipCard}>Are you already registered?</a>
              </form>
          </div>
        </div>
    );
  };
  
  export default LoginRegisterForm;
