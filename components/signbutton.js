import React, { useContext } from 'react';
import UserContext from './context';
import { useRouter } from 'next/router';
import styles from '../styles/signbutton.module.css';

function SignButton() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  // const handleLogOut = () => {
  //   setUser(null);
  //   const popup = document.createElement("div");
  //   popup.className = `${styles.popup}`;
  //   popup.innerHTML = `
  //     <span>You are logged off<button class="${styles.okBtn}">OK</button></span>
  //   `;
  //   document.body.appendChild(popup);
  //   const okButton = popup.querySelector(`.${styles.okBtn}`);
  //   okButton.addEventListener("click", () => {
  //     document.body.removeChild(popup);
  //     router.push("/");
  //   });
  // };
  
  
  const handleLogOut = () => {
    setUser(null);
    const popup = document.createElement("div");
    popup.className =  `${styles.popup}`;
    popup.innerHTML = `<span>You are logged off</span>`;
    document.body.appendChild(popup);
    setTimeout(() => {
      document.body.removeChild(popup);
      router.push('/');
    }, 2000);
  };

  const handleLogIn = () => {
    router.push('/login');
  };

  if (user) {
    return (
      <button className="nav-link" onClick={handleLogOut}>
        Log Off
      </button>
    );
  } else {
    return (
      <button className="nav-link" onClick={handleLogIn}>
        Log In
      </button>
    );
  }
}

export default SignButton;
