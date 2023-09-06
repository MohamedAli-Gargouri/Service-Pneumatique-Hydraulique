const CartReducer = (state = false, action) => {
  switch (action.type) {
    case 'CARTOPEN':
      return true;
    case 'CARTCLOSED':
      return false;
    default:
      return state;
  }
};

export default CartReducer;
