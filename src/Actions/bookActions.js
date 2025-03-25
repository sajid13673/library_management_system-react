import { get } from '../Services/api';

export const fetchBooks = ({page, perPage, orderBy, searchTerm}) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCH_BOOKS_REQUEST' });

    try {
      const state = getState();
      const url = state.auth.token?.role === 'admin' ? '/book' : '/member_book';
      const response = await get(`${url}?page=${page || 1}&per_page=${perPage || 9}&order=${orderBy || 'created_at-desc'}&search_term=${searchTerm}`);
      dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_BOOKS_FAILURE', payload: error });
    }
  };
};
