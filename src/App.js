// Import React
import React, { useEffect, useState } from 'react';

// Import React Router elements
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

// Import components
import Login from './components/Forms/Login'
import AddExpense from './components/Forms/AddExpense'
import AnnualSummary from './components/AnnualSummary'
import MonthlyDetail from './components/MonthlyDetail'
import Dashboard from './components/Dashboard'
import AddCategory from './components/Forms/AddCategory';
import Modeller from './components/Modeller';
import Footer from './components/Layout/Footer'

// Import CSS
import './App.css';
import { Animated } from "react-animated-css";


function App() {
  const [token, setToken] = useState(
    sessionStorage.getItem('token')
  );

  const [toggle, setToggle] = useState(false)

  function ToggleMenu(e) {
    e.preventDefault();
    setToggle(!toggle)
  }

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

        <div className='mynavbar row'>
          <div className='col-sm-8'>
            <h1 className='fw-bold'>{user_name}'s Budget App</h1>
          </div>
          <div className='col-auto'>
            <button className="btn btn-dark" type="button" onClick={((e) => ToggleMenu(e))}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {toggle &&
          <Animated animationIn="bounceInLeft" animationOut="bounceOutRight" isVisible={toggle}>
            <div className='nav-menu'>
              <ul className="nav mb-4">
                <li className='nav-item' onClick={((e) => ToggleMenu(e))}>
                  <NavLink className='nav-link' activeClassName="nav-link active" exact to="/">Home</NavLink>
                </li>
                <li className='nav-item' onClick={((e) => ToggleMenu(e))}>
                  <NavLink className='nav-link' activeClassName="nav-link active" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className='nav-item' onClick={((e) => ToggleMenu(e))}>
                  <NavLink className='nav-link' activeClassName="nav-link active" to="/modeller">Modeller</NavLink>
                </li>
                <li className='nav-item' onClick={((e) => ToggleMenu(e))}>
                  <NavLink className='nav-link' activeClassName="nav-link active" to="/table">Expense Table</NavLink>
                </li>
                <li className='nav-item' onClick={((e) => ToggleMenu(e))}>
                  <NavLink className='nav-link' activeClassName="nav-link active" to="/add-payment">Add Payment</NavLink>
                </li>
                <li className='nav-item' onClick={((e) => ToggleMenu(e))}>
                  <NavLink className='nav-link' activeClassName="nav-link active" to="/add-category">Add Category</NavLink>
                </li>
              </ul>
            </div>
          </Animated>
        }

        <div className='heading'>
          {/*<h1 className='fw-bold'>{user_name}'s Budget App</h1>*/}
          <hr className='mt-4' />
        </div>

        <Switch>
          <Route path="/dashboard">
            <Dashboard token={token} />
          </Route>
          <Route path="/table">
            <MonthlyDetail token={token} />
          </Route>
          <Route path="/modeller">
            <Modeller token={token} />
          </Route>
          <Route path="/add-payment">
            <AddExpense token={token} />
          </Route>
          <Route path="/add-category">
            <AddCategory token={token} />
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
