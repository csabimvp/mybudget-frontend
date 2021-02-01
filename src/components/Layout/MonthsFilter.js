export default function MonthsFilter({ id, active, name, onFilter = f => f }) {
    return (
        <>
            <li className='list-group-item'>
                <button className={active ? 'btn btn-dark btn-lg' : 'btn btn-link'} onClick={() => onFilter(id)}>{name}</button>
            </li>
        </>
    )
}