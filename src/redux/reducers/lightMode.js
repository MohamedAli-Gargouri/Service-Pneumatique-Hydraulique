const LightReducer = (state = "LIGHTMODE", action) => {
    switch (action.type) {
      case "LIGHTMODE":
        return "LIGHTMODE";
      case "DARKMODE":
        return "DARKMODE";
      default:
        return state;
    }
  };
  
  export default LightReducer;
  