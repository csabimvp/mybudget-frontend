export default function RecurringPayments({ data = {}, counter, onDelete = f => f }) {
    const { id, category_name, title, description, value } = data

    return (

        <div className={category_name === 'Income' ? 'recurringpayment-wrapper-income col-6' : 'recurringpayment-wrapper col-6'} id={id}>

            <div className='d-flex w-100 justify-content-between'>
                <h3 className='recurringpayment-counter'><strong># {counter + 1}</strong></h3>
                <button className="btn btn-danger" onClick={(e) => onDelete({ e, data })}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>

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