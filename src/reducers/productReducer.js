const INITIAL_STATE = {
    productList: []
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.key) {
        case "GET_PRODUCT_SUCCESS":
            return { ...state, productList: action.payload }
        default:
            return state
    }
}