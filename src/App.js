// Import React
import React, { useEffect, useState } from 'react';

// Import React Router elements
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Import components
import Login from './components/Forms/Login'
import AddExpense from './components/Forms/AddExpense'
import AnnualSummary from './components/AnnualSummary'
import MonthlyDetail from './components/MonthlyDetail'
import Dashboard from './components/Dashboard'
import Footer from './components/Layout/Footer'

// Import CSS
import './App.css';


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

  const user_name = token['user_first_name']
  // const username = token['user_username']

  return (
    <div className='container-fluid mt-4'>
      <Router>

        <ul className='nav mb-4'>
          <li className='nav-item'>
            <Link className='nav-link' to="/">Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="/dashboard">Dashboard</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="/table">Expense Table</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to="/add-expense">Add Expense</Link>
          </li>
        </ul>

        <div className='heading'>
          <h1 className='fw-bold'>{user_name}'s Budget App</h1>
          <hr className='mt-4' />
        </div>

        <Switch>
          <Route path="/dashboard">
            <Dashboard token={token} />
          </Route>
          <Route path="/table">
            <MonthlyDetail token={token} />
          </Route>
          <Route path="/add-expense">
            <AddExpense token={token} />
          </Route>
          <Route path="/">
            <AnnualSummary token={token} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
