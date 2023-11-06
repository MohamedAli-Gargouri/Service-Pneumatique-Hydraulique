const LightReducer = (state = 'LIGHTMODE', action) => {
  switch (action.type) {
    case 'LIGHTMODE':
      return 'LIGHTMODE';
    case 'DARKMODE':
      return 'DARKMODE';
      case 'RESET':
        return "LIGHTMODE";
    default:
      return state;
  }
};

export default LightReducer;
