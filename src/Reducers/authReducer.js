const initialState = {
    token: JSON.parse(localStorage.getItem('userData')) || null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        localStorage.setItem('userData', JSON.stringify(action.payload));
        return { ...state, token: action.payload };
      case 'REMOVE_TOKEN':
        localStorage.removeItem('userData');
        return { ...state, token: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  