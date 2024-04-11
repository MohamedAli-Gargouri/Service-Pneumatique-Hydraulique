export const openCart = () => {
  return {
    type: 'CART_OPEN',
  };
};
export const closeCart = () => {
  return {
    type: 'CART_CLOSED',
  };
};

export const addProduct = (product: any) => {
  return {
    type: 'ADD_PRODUCT',
    payload: { product },
  };
};

export const removeProduct = (productid: any) => {
  return {
    type: 'REMOVE_PRODUCT',
    payload: { productid },
  };
};

export const setProductQuantity = (productid: any, quantity: any) => {
  return {
    type: 'SET_PRODUCT_QUANTITY',
    payload: { productid, quantity },
  };
};
