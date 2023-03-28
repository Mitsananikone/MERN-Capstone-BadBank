import { useState, useContext } from 'react';
import UserContext from '../components/context';
import styles from '../styles/login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [showError, setShowError] = useState(false); // state to control error popup visibility
  const [showSuccess, setShowSuccess] = useState(false); // state to control success popup visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailValid) {
      setMessage('Please enter a valid email.');
      setShowError(true);
      return;
    }

    if (!passwordValid) {
      setMessage('Password should be at least 8 characters.');
      setShowError(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status !== 200) {
        setShowError(true); // show the error popup if login fails
        throw new Error(await res.text());
      }

      const { user } = await res.json();
      setUser(user); // set the user in the UserContext state
      setMessage(`Success! Welcome, ${user.name}.`);
      setEmail('');
      setPassword('');
      setShowSuccess(true); // show the success popup if login succeeds
    } catch (error) {
      setMessage(`User Email and Password could not be verified`);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };


  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.trim().length >= 8);
  };

  const handleCloseErrorPopup = () => {
    setShowError(false);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccess(false);
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className={emailValid ? "" : "invalid"}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={passwordValid ? "" : "invalid"}
        />
        <br />
        <button type="submit">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {showError && (
        <div className="popup">
          <div className="popup-body">
            <h3>Error</h3>
            <p>{message}</p>
            <button
              className="btn btn-light"
              onClick={() => {
                handleCloseErrorPopup();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="popup">
          <div className="popup-body">
            <h3>Success</h3>
            <p>{message}</p>
            <button
              className="btn btn-light"
              onClick={() => {
                handleCloseSuccessPopup();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

