import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    );
  };

  return (
    <div className='container'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='form'>
        {errors.credential && <p className='errors'>{errors.credential}</p>}
          <input
            type="text"
            placeholder="Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit" disabled={credential.length < 4 && password.length < 6} className='login-button'>Log In</button>
      </form>
      <p>Don't have an account? Sign In</p>
    </div>
  );
}

export default LoginForm;