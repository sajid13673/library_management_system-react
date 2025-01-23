const initialState = {
    members: [],
    loading: false,
    error: null
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MEMBER_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_MEMBER_SUCCESS':
            return { ...state, members: action.payload, loading: false };
        case 'FETCH_MEMBER_FAILURE':
            return { ...state, error: action.payload, loading: false};
        default:
            return state;
    }
};

export default memberReducer;