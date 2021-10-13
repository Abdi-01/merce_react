
export const loginAction = (data) => {
    // console.log("ACTION ==> data dari sign in page :", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}

export const updateCartAction = (data) => {
    return {
        type: "UPDATE_CART",
        payload: data
    }
}