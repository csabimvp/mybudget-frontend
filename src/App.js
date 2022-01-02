// Import React
import React, { useEffect, useState, createContext } from 'react';

// Import CSS
import './App.css';

// Importing components
import Login from './components/Forms/Login';
import Main from './Main';

export const UserContext = createContext()

function App() {
  const [token, setToken] = useState(
    sessionStorage.getItem('token')
  );

  useEffect(() => {
    sessionStorage.setItem('token', token);
  }, [token])

  if (!token || token === 'null') {
    return (
      <div className='main-section container mt-4 text-center'>
        <Login setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <UserContext.Provider value={{ token }}>
        <Main />
      </UserContext.Provider>
    </div>
  );
}

export default App;
