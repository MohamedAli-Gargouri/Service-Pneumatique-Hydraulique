const CartReducer=(state=false,action)=>
{
    switch(action.type){
        case "OPEN_CART": return true
        case "CLOSE_CART": return false
        default : return false
    }
}
export default CartReducer;