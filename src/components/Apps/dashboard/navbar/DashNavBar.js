// Import React Router elements
import { NavLink } from "react-router-dom";

// Import Components
import FilterDropDown from '../../../Layout/FilterDropDown';

export default function DashNavBar({ token = {}, year = [], month = [], yearFilter = {}, monthFilter = {}, onYearFilter = f => f, onMonthFilter = f => f, onResetFilter = f => f }) {
    const { user_first_name } = token
    const today = new Date().getMonth() + 1
    const activeMonth = month.map(mo => {
        if (mo.id === today) {
            return {
                id: mo.id,
                name: mo.name,
                active: true,
            }
        } else {
            return {
                id: mo.id,
                name: mo.name,
                active: false,
            }
        }
    })

    return (
        <nav className="mynavbar navbar navbar-expand-lg">
            <div className="container-fluid">
                <h1 className="navbar-brand">{user_first_name}'s Budget</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="nav-menu">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink className='nav-link' activeclassname="nav-link active" to="/">Dashboard</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' activeclassname="nav-link active" to="/modeller">Modeller</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse" id="navbarsExample05">
                    <hr className="mt-2" />
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <div className="dash-filter">
                                <div className="dropend">
                                    <p>Year Filter</p>
                                    <button id='dashboard-filter-year-button' className='dropdown-toggle dashboard-filter-button' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {yearFilter.name}
                                    </button>

                                    <ul className="dropdown-menu">
                                        {
                                            year.map(y => <FilterDropDown key={y.id} {...y} onFilter={onYearFilter} />)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="dash-filter">
                                <div className="dropend">
                                    <p>Month Filter</p>
                                    <button id='dashboard-filter-month-button' className='dropdown-toggle dashboard-filter-button' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {monthFilter.name}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {
                                            activeMonth.map(m => <FilterDropDown key={m.id} {...m} onFilter={onMonthFilter} />)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="dash-filter">
                                <p>Category Filter</p>
                                <button>Category Filter</button>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="dash-filter">
                                <p>Search</p>
                                <input></input>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="dash-filter">
                                <p>Reset Filter</p>
                                <button id='dashboard-filter-reset-button' className='dashboard-filter-button' onClick={(e) => onResetFilter(e)}>
                                    Reset
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}