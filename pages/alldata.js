import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../components/context';
import { getDatabase } from '../lib/db';
import styles from '../styles/alldata.module.css';

function AllData({ users }) {
  const [data, setData] = useState(users);
  const { user } = useContext(UserContext);

  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className = {styles.container}>
      <table style={{ border: '1px solid black', width: '80%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Password</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.email}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.email}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.password}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const { db } = await getDatabase();
    const users = await db.collection('user').find().toArray();
    const stringifiedUsers = JSON.stringify(users);
    const parsedUsers = JSON.parse(stringifiedUsers, (key, value) => {
      if (key === '_id') {
        return value.toString();
      }
      return value;
    });
    return { props: { users: parsedUsers } };
  } catch (error) {
    console.error(error);
    return { props: { users: [] } };
  }
}

export default AllData;
