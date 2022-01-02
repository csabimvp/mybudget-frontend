// Import React Router elements
import {
    Routes,
    Route,
} from "react-router-dom";

// Import Components
import ModellerNavBar from "../Apps/modeller/navbar/ModellerNavBar";
import DashNavBar from "../Apps/dashboard/navbar/DashNavBar";

export default function NavBar({ token = {}, year = [], month = [], yearFilter = {}, monthFilter = {}, onYearFilter = f => f, onMonthFilter = f => f, onResetFilter = f => f }) {
    return (
        <div className='navbar-wrapper'>
            <Routes>
                <Route path='/modeller' element={<ModellerNavBar
                    year={year}
                    month={month}
                    yearFilter={yearFilter}
                    monthFilter={monthFilter}
                    onYearFilter={onYearFilter}
                    onMonthFilter={onMonthFilter}
                    onResetFilter={onResetFilter}
                />} />
                <Route path='/' element={<DashNavBar
                    token={token}
                    year={year}
                    month={month}
                    yearFilter={yearFilter}
                    monthFilter={monthFilter}
                    onYearFilter={onYearFilter}
                    onMonthFilter={onMonthFilter}
                    onResetFilter={onResetFilter}
                />} />
            </Routes>
        </div>
    )
}