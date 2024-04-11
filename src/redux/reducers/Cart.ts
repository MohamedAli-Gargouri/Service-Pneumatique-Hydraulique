const CartReducer = (state = false, action: any): boolean => {
  switch (action.type) {
    case 'CART_OPEN':
      return true;
    case 'CART_CLOSED':
      return false;
    default:
      return state;
  }
};

export const CartListReducer = (state: Array<any> = [], action: any): Array<any> => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const stateCopy = state;
      const productToUpdate: any = stateCopy.find(
        (product: any) => product.ProductID === action.payload.product.ProductID,
      );
      if (productToUpdate) {
        // Product with the specified ID was found, so update its quantity
        productToUpdate.ProductQuantity = parseInt(productToUpdate.ProductQuantity) + 1;
        return stateCopy;
      } else {
        return [...state, action.payload.product];
      }
    }
    case 'RESET':
      return [];

    case 'REMOVE_PRODUCT':
      return state.filter((product: any) => product.ProductID !== action.payload.productid);
    case 'SET_PRODUCT_QUANTITY':
      return state.map((product: any) => {
        if (product.ProductID === action.payload.productid) {
          // If the product ID matches, update the quantity
          return { ...product, ProductQuantity: parseInt(action.payload.quantity) };
        }
        // Otherwise, return the product unchanged
        return product;
      });
    default:
      return state;
  }
};

export default CartReducer;
