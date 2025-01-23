import store from '../store'; // Import your Redux store

export const getToken = () => {
    const state = store.getState();
    return state.auth.token;
};
