// Importing Charts
import ExpenseByMonths from "../../Charts/ExpenseByMonths"
import ExpenseByCategories from "../../Charts/ExpenseByCategories"
import IncomeVsSavingPie from "../../Charts/IncomeVsSavingPie"

// Importing Components
import AddPayment from "../../Forms/AddPayment";
import AddCategory from "../../Forms/AddCategory";
import ExpenseTable from "../../Layout/ExpenseTable"

export default function Dashboard({ token = {}, dashboardData = {}, monthlyData = [], filteredPayments = [], filteredExpenses = [] }) {
    function handleSumValues(items = {}) {
        //const sum_total = items.reduce((total, obj) => total = parseInt(obj.value, 10) + total, 0)
        const sum_total = items.reduce((total, obj) => total = parseFloat(obj.value) + total, 0)

        return sum_total.toFixed(2);
    }

    return (
        <>
            <div className="add-payment-wrapper row">
                <div className="col-6">
                    <AddPayment token={token} />
                </div>
                <div className="col-6">
                    <AddCategory token={token} />
                </div>
            </div>
            <hr className="mt-2" />
            <h1 className='section-title'>Statistics</h1>
            <div className='statistics-wrapper'>
                <h3 className='statistics-transactions'>{dashboardData.year} - {dashboardData.month}</h3>
                <h3 className='statistics-title'>Total Transactions</h3>
                <h3 className='statistics-transactions'>{dashboardData.total_transactions}</h3>
                <hr className='mt-2' />
                <h3 className='statistics-title'><strong className='statistics-precent'>+</strong> Income: <span className='statistics-income'>£ {dashboardData.income}</span> - <span className='statistics-precent'>100%</span></h3>
                <h3 className='statistics-title'><strong className='statistics-precent'>-</strong> Expenses: <span className='statistics-expense'>£ {dashboardData.expense}</span> - <span className='statistics-precent'>{Math.round(dashboardData.expense_percent * 100)} %</span></h3>
                <hr className='mt-2' />
                <h3 className='statistics-title'><strong className='statistics-precent'>=</strong> Saving: <span className='statistics-saving'>£ {dashboardData.saving}</span> - <span className='statistics-precent'>{Math.round(dashboardData.saving_percent * 100)} %</span></h3>
            </div>
            <div className="chart-hidden-on-small">
                <ExpenseByMonths months={monthlyData} year={dashboardData.year} />
            </div>
            <div>
                <ExpenseByCategories data={filteredPayments} year={dashboardData.year} month={dashboardData.month} />
            </div>
            <div>
                <IncomeVsSavingPie data={dashboardData} />
            </div>
            <div>
                <h1 className='section-title'>Expenses</h1>
                <div className="budget-table">
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th className='table-hidden-onsmall' scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th className='table-hidden-onsmall' scope="col">Description</th>
                                <th scope="col">Date</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredExpenses.map((payment, i) => <ExpenseTable key={payment.id} payment={payment} rownum={i} />)
                            }
                        </tbody>
                        <tfoot>
                            <tr className='total'>
                                <td colSpan='3'><strong>Total:</strong></td>
                                <td className='total-value'><strong>£ {handleSumValues(filteredExpenses)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}