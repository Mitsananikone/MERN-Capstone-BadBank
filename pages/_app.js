import { useState } from 'react';
import UserContext from '../components/context';
import NavBar from '../components/navbar';
import '../styles/globals.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  return (

    <UserContext.Provider value={{ user, setUser }}>
      <NavBar user={user} /> {/* Pass the user object as a prop */}
      <div className="page-container">
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>

  );
}

export default App;
