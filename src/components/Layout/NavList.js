export default function NavList({ id, active, name, onFilter = f => f }) {
    return (
        <>
            <li className='nav-item'>
                <button className={active ? 'btn btn-warning btn-lg' : 'btn btn-link'} onClick={() => onFilter(id)}>{name}</button>
            </li>
        </>
    )
}