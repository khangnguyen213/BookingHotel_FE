import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import styles from './auth.module.css';
import Global from '../../global';
import axios from 'axios';

const Login = () => {
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const loginHandler = (e) => {
    e.preventDefault();
    const userDetail = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(`${Global.BASE_BACKEND_API}/login`, userDetail)
      .then((res) => {
        localStorage.user = JSON.stringify(res.data);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      });
  };
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>LOGIN</h1>

        <form className={styles.form} onSubmit={loginHandler}>
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
          {err && <div className={styles.errorMsg}>{err.toString()}</div>}
          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
