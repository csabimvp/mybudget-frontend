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
                data: action.payload,
            }
        }
        case 'FETCH_FAILURE': {
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: [],
            }
        }
        default: {
            throw new Error(`Unhandled type: ${action.type}`)
        }
    }
}