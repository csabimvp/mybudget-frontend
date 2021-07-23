export default function RecurringPayments({ data = {}, counter }) {
    const { category_name, title, description, value } = data

    return (

        <div className={category_name === 'Income' ? 'recurringpayment-wrapper-income col-6' : 'recurringpayment-wrapper col-6'}>
            <h3 className='recurringpayment-counter'><strong># {counter + 1}</strong></h3>
            <h2><span className='recurringpayment-category'>{category_name}</span><span> -·- <strong>{title}</strong></span></h2>
            <h3 className={category_name === 'Income' ? 'dashboard-saving-value' : 'dashboard-expense-value'}><strong>£ {value}</strong></h3>
            <hr className='mt-2' />
            {description.length > 0 ? (
                <p>{description}</p>
            ) : (
                <p>No description was given.</p>
            )}

        </div>
    )
}