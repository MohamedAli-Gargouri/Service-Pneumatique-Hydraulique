const isLoggedReducer = (state = false, action) => {
    switch (action.type) {
      case 'SET_LOGGED':
        return true;
      case 'UNSET_LOGGED':
        return false;
        case 'RESET':
            return false;
      default:
        return state;
    }
  };
  export default isLoggedReducer;
  