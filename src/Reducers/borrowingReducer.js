const initialState = {
  loading: false,
  returnSuccess: false,
  deleteSuccess: false,
  returnError: null,
  deleteError: null,
};

const borrowingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_BORROWING_REQUEST":
      return {
        ...state,
        loading: true,
        deleteError: null,
        deleteSuccess: false,
      };
    case "DELETE_BORROWING_SUCCESS":
      return { ...state, loading: false, deleteSuccess: true };
    case "DELETE_BORROWING_FAILURE":
      return { ...state, loading: false, deleteError: action.payload };
    case "UPDATE_BORROWING_REQUEST":
      return {
        ...state,
        loading: true,
        returnError: null,
        returnSuccess: false,
      };
    case "UPDATE_BORROWING_SUCCESS":
      return { ...state, loading: false, returnSuccess: true };
    case "UPDATE_BORROWING_FAILURE":
      return { ...state, loading: false, returnError: action.payload };
    default:
      return state;
  }
};

export default borrowingReducer;
