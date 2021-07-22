export default function categoryReducer(state, action) {
    switch (action.type) {
        case 'FETCH': {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case 'FETCH_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        }
        case 'FETCH_FAILURE': {
            return {
                isLoading: false,
                isError: true,
                data: []
            }
        }
        case 'EDIT': {
            return {
                ...state,
                data: state.data.map(
                    category => action.payload.id === category.id ? action.payload : category
                ),
            }
        }
        case 'ADD': {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }
        default: {
            throw new Error(`Unhandled type: ${action.type}`)
        }
    }
}