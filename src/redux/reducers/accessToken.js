const accessToken = (state = "NO_ACCESS_TOKEN", action) => {
    switch (action.type) {
      case 'SET_ACCESSTOKEN':
        return action.payload;
      case 'UNSET_ACCESSTOKEN':
        return "NO_ACCESS_TOKEN";
        case 'RESET':
            return "NO_ACCESS_TOKEN";
      default:
        return state;
    }
  };
  export default accessToken;