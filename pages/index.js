import Head from 'next/head';
import { useContext, useEffect } from 'react';
import UserContext from '../components/context';
import styles from '../styles/home.module.css';
import { getAllUsers } from '../lib/dal';
import { getDatabase } from '../lib/db';
import Home from './home';

export default function App({ allUsers = [] }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('user:', user); // add this line
  }, [user]);

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Home/>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { db } = await getDatabase();
    const allUsers = await getAllUsers(db);
    return { props: { allUsers } };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { props: { allUsers: [] } };
  }
}
