const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return {
        ...state,
        open: action.payload,
      };
    case "TOGGLE_STATUS_SIDEBAR":
      return {
        ...state,
        open: !state.open,
      };
    case "COLLAPSE_MENU":
      return {
        ...state,
        collapsed: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
