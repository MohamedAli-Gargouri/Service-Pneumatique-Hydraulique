const LanguageReducer = (state = "fr", action) => {
    switch (action.type) {
      case 'ENGLISH':
        return "en";
      case 'FRENCH':
        return "fr";
      case 'ARABIC':
        return "ar";
      default:
        return state;
    }
  };
  
  export default LanguageReducer;
  