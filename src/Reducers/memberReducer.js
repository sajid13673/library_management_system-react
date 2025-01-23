const initialState = {
    members: [],
    loading: false,
    error: null
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MEMBERS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_MEMBERS_SUCCESS':
            return { ...state, members: action.payload, loading: false };
        case 'FETCH_MEMBERS_FAILURE':
            return { ...state, error: action.payload, loading: false};
        default:
            return state;
    }
};

export default memberReducer;