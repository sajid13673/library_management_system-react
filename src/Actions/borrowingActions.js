import { del, post } from "../Services/api";

export const deleteBorrowing = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_BORROWING_REQUEST" });
    try {
      await del(`/borrowing/${id}`);
      dispatch({ type: "DELETE_BORROWING_SUCCESS" });
    } catch (error) {
      dispatch({ type: "DELETE_BORROWING_FAILURE", payload: error.message });
    }
  };
};
export const confirmReturn = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_BORROWING_REQUEST" });
    try {
      await post(`/borrowing/${id}`, data);
      dispatch({ type: "UPDATE_BORROWING_SUCCESS" });
    } catch (error) {
      dispatch({ type: "UPDATE_BORROWING_FAILURE", payload: error.message });
    }
  };
};
