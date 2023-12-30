import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import styles from './auth.module.css';
import Global from '../../global';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const registerHandler = (e) => {
    e.preventDefault();
    const userDetail = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      fullName: fullnameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneRef.current.value,
      isAdmin: false,
    };
    console.log(userDetail);

    axios
      .post(`${Global.BASE_BACKEND_API}/register`, userDetail)
      .then((res) => {
        localStorage.user = JSON.stringify(res.data);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>REGISTER</h1>
        <form className={styles.form} onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="Username"
            required
            ref={usernameRef}
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            required
            ref={passwordRef}
            className={styles.inputField}
          />
          <input
            type="text"
            placeholder="Full name"
            required
            ref={fullnameRef}
            className={styles.inputField}
          />
          <input
            type="text"
            placeholder="Phone number"
            required
            ref={phoneRef}
            className={styles.inputField}
          />
          <input
            type="text"
            placeholder="Email"
            required
            ref={emailRef}
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitBtn}>
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
