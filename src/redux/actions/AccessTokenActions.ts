
  
  export const SET_ACCESS_TOKEN = (AccessTokenValue:string):{type:"SET_ACCESSTOKEN",payload:string} => {
    return {
      type: 'SET_ACCESSTOKEN',
      payload:AccessTokenValue
    };
  };
  export const UNSET_ACCESS_TOKEN = ():{type:"UNSET_ACCESSTOKEN"} => {
    return {
      type: 'UNSET_ACCESSTOKEN',
    };
  };
  
  