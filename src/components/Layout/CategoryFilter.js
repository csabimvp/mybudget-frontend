export default function CategoryFilter({ id, active, name, onFilter = f => f }) {
    return (
        <>
            <li>
                <a className={active ? 'dropdown-item active' : 'dropdown-item'} href='#/' onClick={(e) => onFilter(e, id, name)}>{name}</a>
            </li>
        </>
    )
}