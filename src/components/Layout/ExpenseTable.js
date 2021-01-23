export default function ExpenseTable({ payment = {}, rownum }) {
    const { category_name, created, title, description, value } = payment

    return (
        <tr>
            <th scope='row'>{rownum + 1}</th>
            <td>{title}</td>
            <td>{category_name}</td>
            <td>{description}</td>
            <td>{created}</td>
            <td>£ {value}</td>
        </tr>
    )
}