export const coupenReducer = (state = false, action) => {
  switch (action.type) {
    case "COUPEN_APPLIED":
      return action.payload;
    default:
      return state;
  }
};