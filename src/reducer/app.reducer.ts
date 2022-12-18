export const appReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    case 'SET_USERDATA':
      return { ...state, userData: action.payload };
    case 'UPDATE_ASSETS':
      return { ...state, userData: { ...state.userData, assets: action.payload } };
    default:
      return state;
  }
};
export default appReducer;
