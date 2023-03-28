import { useState, useEffect } from 'react';
import styles from '../styles/createaccount.module.css';
import dotenv from 'dotenv';
dotenv.config();

import { useRouter } from 'next/router';

export default function CreateAccount({ alluser = [] }) {
  const router = useRouter();
  const [userState, setuserState] = useState(alluser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [popup, setPopup] = useState('');
  const [show, setShow] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setNameValid(false);
    setEmailValid(false);
    setPasswordValid(false);
    setShow(false);
    setPopup('');
  };

  const validateForm = () => {
    setNameValid(name.trim().length > 0);
    setEmailValid(validateEmail(email));
    setPasswordValid(password.trim().length >= 8);
    setNameError(nameValid ? '' : 'Name is required');
    setEmailError(emailValid ? '' : 'Email is invalid');
    setPasswordError(passwordValid ? '' : 'Password must be at least 8 characters');
  };

  useEffect(() => {
    validateForm();
  }, [name, email, password]);

  let submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!nameValid || !emailValid || !passwordValid) {
      setPopup('error');
      setShow(true);
      setLoading(false);
      return;
    }

    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (res.status !== 200) {
        throw new Error(`Error: ${await res.text()}`);
      }

      const data = await res.json();
      setuserState([...userState, data]);
      setName("");
      setEmail("");
      setPassword("");
      setPopup('success');
      setShow(true);
      setTimeout(() => {

      }, 3000);
    } catch (error) {
      console.error(error);
      setPopup('error');
      setShow(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create a new user</h1>
      <form className={styles.form} onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameValid(name.trim().length > 0)}
          className={nameValid ? "" : "invalid"}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailValid(validateEmail(email))}
          className={emailValid ? "" : "invalid"}
        />
        <br />
        <input
          type="password"
          placeholder="Password (+8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setPasswordValid(password.trim().length >= 8)}
          className={passwordValid ? "" : "invalid"}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {popup && (
        <div className="popup">
          <div className="popup-body ">
            {popup === "success" ? (
              <div>
                Account created - Please log in
                <div className="button-container">
                  <button className={styles.buttonChoose} onClick={() => router.push('/login')}>Go to Login</button>
                  <button className={styles.buttonChoose} onClick={() => clearForm()}>Create Another Account</button>
                </div>
              </div>
            ) : (
              <div className="popup">
                <div className="popup-body ">
                  <div>
                    Error creating account: {popup === "invalidEmail" ? "Email not in correct format" : "Password is less than 8 characters"}
                    <div className="button-container">
                      <button className={styles.buttonChoose} onClick={() => clearForm()}>Try Again</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
  
}  


export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.status !== 200) {
      throw new Error(`Error: ${await res.text()}`);
    }

    const data = await res.json();
    const alluser = Array.isArray(data.data) ? data.data : [];

    return { props: { alluser } };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { props: { alluser: [] } };
  }
}