import Link from 'next/link';
import React, { useContext } from 'react';
import UserContext from '../components/context';
import SignButton from './signbutton';

export default function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-gradient fixed-top">

        <Link href="/">
        <div className="space-right" style={{width: '100px'}}></div>

          <button className="navbar-brand" type="button" style={{margin: '0 20px', border: '1px solid white'}}>BadBank</button>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/createaccount/">
                <button className="nav-link rect-button btn-outline-secondary" type="button">Create Account</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/deposit/">
                <button className="nav-link rect-button btn-outline-secondary" type="button">Deposit</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/withdraw/">
                <button className="nav-link rect-button btn-outline-secondary" type="button">Withdraw</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/alldata/">
                <button className="nav-link rect-button btn-outline-secondary" type="button">AllData</button>
              </Link>
            </li>
            <div className="space-right" style={{width: '700px'}}></div>
            <li className="nav-item">
            <div className="d-flex mr-auto">
              <SignButton />
              <label className="nav-link ml-2">
                {user ? `Welcome, ${user.name}` : ''}
              </label>
            </div>
          </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
