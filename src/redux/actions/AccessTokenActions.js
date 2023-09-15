
  
  export const SET_ACCESS_TOKEN = (AccessTokenValue) => {
    return {
      type: 'SET_ACCESSTOKEN',
      payload:AccessTokenValue
    };
  };
  export const UNSET_ACCESS_TOKEN = () => {
    return {
      type: 'UNSET_ACCESSTOKEN',
    };
  };
  
  