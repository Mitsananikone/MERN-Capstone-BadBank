import { useContext, useState } from 'react';
import UserContext from '../components/context';
import { ATM } from '../components/atm';
import styles from '../styles/atm.module.css';
import { useRouter } from 'next/router';

export default function Withdraw() {
  const { user, setUser } = useContext(UserContext);
  const [withdrawal, setWithdrawal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [show, setShow] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const clearForm = () => {
    setShow(true);
    setStatus('');
    setWithdrawal(0);
  };

  const submitWithdrawal = async (e) => {
    e.preventDefault();
    setShow(false);
    setLoading(true);

    if (isNaN(withdrawal)) {
      setStatus('Please enter a valid number');
      setLoading(false);
      return;
    }

    if (parseFloat(withdrawal) > user.balance) {
      setStatus('Transaction failed. Insufficient funds');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, amount: parseFloat(withdrawal) })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message);
        setUser({ ...user, balance: user.balance - parseFloat(withdrawal) });
        setShowSuccess(true);
        setWithdrawal(0);
      } else {
        setStatus(data.message);
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      setStatus('Error withdrawing funds');
    } finally {
      setLoading(false);
    }
  };

  const secondCardButton = withdrawal <= 0 || loading;

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
          bgcolor="warning"
          txtcolor="black"
          header="WITHDRAW"
          title="BALANCE"
          balance={`$${user.balance}`}
          // status={status}
          disabled="true"
          show={show}
          showSuccess={showSuccess}
          body={
            show ? (
              <div className={styles.form}>
                {/* Withdraw form */}
                <label>
                  <br />
                  Withdraw Amount
                </label>
                <input
                  type="number"
                  className={`${styles['form-control']} ${styles['glowing-border']}`}
                  id="withdrawal"
                  placeholder="Amount to Withdraw"
                  value={withdrawal}
                  onChange={(e) => setWithdrawal(e.currentTarget.value)}
                />
                <button
                  id="ATMsubmit"
                  type="submit"
                  className="btn btn-light"
                  disabled={secondCardButton}
                  onClick={submitWithdrawal}
                >
                  Withdraw
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
