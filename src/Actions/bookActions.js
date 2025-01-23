import { get } from '../Services/api';

export const fetchBooks = (page, perPage) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCH_BOOKS_REQUEST' });

    try {
      const state = getState();
      const url = state.auth.token?.role === 'admin' ? '/book' : '/member_book';
      const response = await get(`${url}?page=${page}&per_page=${perPage}`);
      dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_BOOKS_FAILURE', payload: error });
    }
  };
};
