import {get} from '../Services/api';

export const fetchMembers = (page, perPage) => {
    return async (dispatch) => {
        dispatch({type: 'FETCH_MEMBERS_REQUEST'});
        try {
            const response = await get(`/member?page=${page || 1}&per_page=${perPage || 9}`);
            dispatch({type: 'FETCH_MEMBERS_SUCCESS', payload: response.data});
        } catch (error) {
            dispatch({type: 'FETCH_MEMBERS_FAILURE', payload: error.message});
        }
    }
}