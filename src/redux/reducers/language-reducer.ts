const LanguageReducer = (state = 'fr', action: any): string => {
  switch (action.type) {
    case 'ENGLISH':
      return 'en';
    case 'FRENCH':
      return 'fr';
    case 'ARABIC':
      return 'ar';
    case 'RESET':
      return 'fr';
    default:
      return state;
  }
};

export default LanguageReducer;
