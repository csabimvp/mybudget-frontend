export default function Category({ category = {} }) {
    const { id, name } = category

    return (
        <div className='category-list d-flex justify-content-between' id={id}>
            <h3 className='mb-1'>{name}</h3>
            <button className='btn btn-dark ml-4'>
                <i className="far fa-edit"></i>
            </button>
        </div >
    )
}