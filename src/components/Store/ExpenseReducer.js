export default function ExpenseReducer(state, action) {
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
                total: action.payload[0],
                category: action.payload[1],
            }
        }
        case 'FETCH_FAILURE': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                total: [],
                category: [],
            }
        }
        default: {
            throw new Error(`Unhandled type: ${action.type}`)
        }
    }
}