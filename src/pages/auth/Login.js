import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import styles from './auth.module.css';
import Global from '../../global';

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
    fetch(`${Global.BASE_BACKEND_API}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetail),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        localStorage.user = JSON.stringify(result);
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
        <h1>LOGIN</h1>

        <form className={styles.form} onSubmit={loginHandler}>
          <input
            type="text"
            placeholder="Username"
            required
            ref={usernameRef}
          />
          <input
            type="text"
            placeholder="Password"
            required
            ref={passwordRef}
          />
          {err && <div>{err.toString()}</div>}
          <button onClick={loginHandler}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
