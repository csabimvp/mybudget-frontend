export default function ExpenseList({ expense = {} }) {
    const { name, value__sum } = expense

    return (
        <>
            <div className='expense-list'>
                <h3>{name}</h3>
                <hr className='mt-3'></hr>
                <h2><strong>£ {value__sum}</strong></h2>
            </div>
        </>
    )
}