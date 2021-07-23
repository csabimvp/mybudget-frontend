export default function ModellerReducer(state, action) {
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
                modeller: action.payload[0],
                recurring_payments: action.payload[1],
            }
        }
        case 'FETCH_FAILURE': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                modeller: [],
                recurring_payments: [],
            }
        }
        default: {
            throw new Error(`Unhandled type: ${action.type}`)
        }
    }
}