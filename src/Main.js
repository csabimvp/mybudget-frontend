// Importing React components
import React, { useEffect, useState, createRef, useContext } from 'react';

// Import React Router elements
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

// Import CSS
import './App.css';

// Importing 3rd party components
import axios from 'axios';
import lottie from 'lottie-web';

// Importing animations
import Loader from './components/Assets/Loader.json';

// Importing components
import NavBar from './components/Layout/NavBar';
import Dashboard from './components/Apps/dashboard/Dashboard';
import Modeller from './components/Apps/modeller/Modeller';
import Footer from './components/Layout/Footer';
import { UserContext } from './App';

export default function Main() {
    const { token } = useContext(UserContext)
    const { key, user, user_username } = token

    let LoaderContainer = createRef()
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const years = [
        { id: 0, name: 'All years', active: false },
        { id: 2018, name: "2018", active: false },
        { id: 2019, name: "2019", active: false },
        { id: 2020, name: "2020", active: false },
        { id: 2021, name: "2021", active: false },
        { id: 2022, name: "2022", active: false },
        { id: 2022, name: "2023", active: true },
    ]
    const months = [
        { id: 0, name: 'All months', active: false },
        { id: 1, name: 'January', active: false },
        { id: 2, name: 'February', active: false },
        { id: 3, name: 'March', active: false },
        { id: 4, name: 'April', active: false },
        { id: 5, name: 'May', active: false },
        { id: 6, name: 'June', active: false },
        { id: 7, name: 'July', active: false },
        { id: 8, name: 'August', active: false },
        { id: 9, name: 'September', active: false },
        { id: 10, name: 'October', active: false },
        { id: 11, name: 'November', active: false },
        { id: 12, name: 'December', active: false },
    ]
    const today = new Date().getMonth() + 1

    const [dashboardData, setDashboardData] = useState({
        year: "",
        month: "",
        total_transactions: "",
        expense: "",
        income: "",
        saving: "",
        expense_percent: "",
        saving_percent: "",
        categories: []
    })
    const [monthlyData, setMonthlyData] = useState([])
    const [expenseList, setExepenseList] = useState([])

    const [month, setMonth] = useState(months)
    const [monthFilter, setMonthfilter] = useState(months[today])
    const [year, setYear] = useState(years)
    const [yearFilter, setYearFilter] = useState({ id: 2022, name: "2022" })
    const [titleFilter, setTitleFilter] = useState('')

    //const filteredMonths = month.filter(m => m.id <= today)
    const filteredPayments = dashboardData.categories.filter(payment => {
        return payment.name !== 'Income'
    }).sort((a, b) => b.value__sum - a.value__sum)
    const filteredExpenses = expenseList.filter(expense => {
        return expense.category_name !== 'Income'
    })

    function handleYearFilter(e, year_id, year_name) {
        e.preventDefault();
        const newYear = years.map(year => {
            if (year.id === year_id) {
                year_id === 0 ? setYearFilter({ id: '', name: 'Year-to-Date' }) : setYearFilter({ id: year_id, name: year_name })
                return {
                    id: year.id,
                    name: year.name,
                    active: true,
                }
            } else {
                return {
                    id: year.id,
                    name: year.name,
                    active: false
                }
            }
        })
        setYear(newYear)
    };

    function handleMonthFilter(e, month_id, month_name) {
        e.preventDefault();
        const newMonth = months.map(month => {
            if (month.id === month_id) {
                month_id === 0 ? setMonthfilter({ id: '', name: 'Year-to-Date' }) : setMonthfilter({ id: month_id, name: month_name })
                return {
                    id: month.id,
                    name: month.name,
                    active: true,
                }
            } else {
                return {
                    id: month.id,
                    name: month.name,
                    active: false
                }
            }
        })
        setMonth(newMonth)
    };

    function handleResetFilters(e) {
        e.preventDefault();

        setYearFilter({ id: 2022, name: "2022" })
        setMonthfilter({ id: months[today].id, name: months[today].name })
        setTitleFilter('')
    };

    useEffect(() => {
        setIsLoading(true)
        axios.all([
            axios.get(`https://www.csabakeller.com/api/mybudget/annual-summary/?username=${user_username}&year=${yearFilter.id}&month=${monthFilter.id}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + key
                }
            }),
            axios.get(`https://www.csabakeller.com/api/mybudget/payments?user=${user}&date_year=${yearFilter.id}&date_month=${monthFilter.id}&category=&title=${titleFilter}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + key
                }
            }),
        ])
            .then((response) => {
                const totalDash = response[0].data
                const totalExpenses = response[1].data
                setDashboardData(totalDash)
                setExepenseList(totalExpenses)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                setIsError(true)
            })
    }, [key, user, user_username, yearFilter, monthFilter, titleFilter])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://www.csabakeller.com/api/mybudget/monthly-summary/?username=${user_username}&year=${yearFilter.id}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + key
            }
        })
            .then((res) => {
                const totalMonthlyData = res.data
                setMonthlyData(totalMonthlyData)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                setIsError(true)
            })
    }, [key, user_username, yearFilter])

    useEffect(() => {
        lottie.loadAnimation({
            container: LoaderContainer.current,
            animationData: Loader,
        })
    })

    return (
        <div>
            <Router>
                <NavBar
                    token={token}
                    year={year}
                    month={month}
                    yearFilter={yearFilter}
                    monthFilter={monthFilter}
                    filteredPayments={filteredPayments}
                    onYearFilter={handleYearFilter}
                    onMonthFilter={handleMonthFilter}
                    onResetFilter={handleResetFilters}
                />
                <div className='main'>
                    <div className="loading-wrapper text-center">
                        {isError && <h2>Something went wrong =( </h2>}
                        {isLoading &&
                            <>
                                <h2 className='lead'>Calculating Expenses...</h2>
                                <div className='animation animations' ref={LoaderContainer}></div>
                            </>
                        }
                    </div>
                    <Routes>
                        <Route path='/modeller' element={<Modeller />} />
                        <Route path='/' element={<Dashboard
                            token={token}
                            dashboardData={dashboardData}
                            monthlyData={monthlyData}
                            filteredPayments={filteredPayments}
                            filteredExpenses={filteredExpenses}
                        />} />
                    </Routes>
                </div>
            </Router>
            <Footer />
        </div>
    );
}