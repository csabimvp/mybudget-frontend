export default function Category({ category = {} }) {
    const { name } = category

    return (
        <div className='category-list'>
            <h3>{name}</h3>
        </div>
    )
}