export default function DashboardMonths({ data = {} }) {
    const { month, expense, expense_percent, income, saving, saving_percent, total_transactions } = data

    return (

        <div className='dashboard-month-wrapper col-6'>
            <h2><strong>{month}</strong></h2>
            <h3>Transactions: <strong>{total_transactions}</strong></h3>
            <hr className='mt-2' />
            <h3>Income: <strong>£ {income}</strong></h3>
            <h3>Expenses: <span className='dashboard-expense-value'><strong>£ {expense}</strong></span></h3>
            <h3>Saving: <span className='dashboard-saving-value'><strong>£ {saving}</strong></span></h3>
            <hr className='mt-2' />
            <p>Expense: <span className='dashboard-expense-value'><strong>{expense_percent}%</strong></span> -·- Saving: <span className='dashboard-saving-value'><strong>{saving_percent}%</strong></span></p>
        </div>

    )
}