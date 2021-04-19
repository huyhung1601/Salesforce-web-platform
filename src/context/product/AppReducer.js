export default(state,action) =>{
    switch (action.type) {
        case 'ADD_PRODUCT':            
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'DELETE_PRODUCT':
            const id = action.payload
            return{
                ...state,
                products: state.products.filter(x=>x.id !== id)
            }
        case 'EDIT_PRODUCT':
            const productId = action.payload.id
            const recordIndex= state.products.findIndex(x=>x.id === productId)
            const updateProduct = action.payload
            state.products.splice(recordIndex,1,updateProduct)
            return{
                ...state,
            }
        case 'ADD_ORDER':
            return{
                ...state,
                orders: [...state.orders, action.payload]
            }
        
        case 'CHECK_ORDERS':            
            return{
                ...state,
                orders: state.orders.map(x=>x.id === action.payload?{...x, paid: !(x.paid)}:x)
            }
        case 'REFUND_ORDER':
            return{
                ...state,
                orders: state.orders.filter(x=>x.id !== action.payload)
            }
        default:
            return state;
    }
}