import { useContext, useState } from 'react';
import UserContext from '../components/context';
import { ATM } from '../components/atm';
import styles from '../styles/atm.module.css';
import { useRouter } from 'next/router';

export default function Deposit() {
  const { user, setUser } = useContext(UserContext);
  const [deposit, setDeposit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const clearForm = () => {
    setShow(true);
    setStatus('');
    setDeposit(0);
  };

  const submitDeposit = async (e) => {
    e.preventDefault();
    setShow(false);
    setLoading(true);
  
    if (isNaN(deposit)) {
      setStatus('Please enter a valid number');
      setLoading(false);
      return;
    }
  
    if (parseFloat(deposit) <= 0) {
      setStatus('Please enter a positive number');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, amount: parseFloat(deposit) })
      });
    
      const data = await response.json();
    
      if (response.ok) {
        setStatus(data.message);
        setUser({ ...user, balance: user.balance + parseFloat(deposit) });
        setShowSuccess(true);
        setDeposit(0);
      } else {
        setStatus(data.message);
      }
    } catch (error) {
      console.error('Error depositing funds:', error);
      setStatus('Error depositing funds: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const secondCardButton = deposit <= 0 || loading;
  
  if (!user) {
    const Router = useRouter();
  
    const handleLoginClick = () => {
      Router.push('/login');
    }
  
    return (
      <div className={styles.container}>
        <div className={styles.loggedOff} onClick={handleLoginClick}><a href="/login">Please log in</a></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className={styles.container}>
        <ATM
          bgcolor="success"
          txtcolor="black"
          header="DEPOSIT"
          title="BALANCE"
          balance={`$${user.balance}`}
          // status={status}
          disabled="true"
          show={show}
          showSuccess={showSuccess}
          body={
            show ? (
              <div className={styles.form}>
                {/* Deposit form */}
                <label>
                  <br />
                  Deposit Amount
                </label>
                <input
                  type="number"
                  className={`${styles['form-control']} ${styles['glowing-border']}`}
                  id="deposit"
                  placeholder="Amount to Deposit"
                  value={deposit}
                  onChange={(e) => setDeposit(e.currentTarget.value)}
                />
                <button
                  id="ATMsubmit"
                  type="submit"
                  className="btn btn-light"
                  disabled={secondCardButton}
                  onClick={submitDeposit}
                >
                  Deposit
                </button>
              </div>
            ) : (
              // Success message
              <div className="popup">
                <div className="popup-body">
                  {/* <h3>Success!</h3> */}
                  <p>{status}</p>
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      clearForm();
                      setShow(true);
                      setShowSuccess(false);
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )
          }
        />
      </div>
    </div>
  );
        }
  
    