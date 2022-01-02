export default function FilterDropDown({ id, active, name, onFilter = f => f }) {
    if (id === 0) {
        return (
            <>
                <li>
                    <a className={active ? 'dropdown-item active' : 'dropdown-item'} href='#/' onClick={(e) => onFilter(e, id, name)}>{name}</a>
                </li>
                <li><hr className="dropdown-divider" /></li>
            </>
        )
    }

    return (
        <>
            <li>
                <a className={active ? 'dropdown-item active' : 'dropdown-item'} href='#/' onClick={(e) => onFilter(e, id, name)}>{name}</a>
            </li>

        </>
    )
}