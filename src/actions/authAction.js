import axios from "axios"

export const loginAction = (data) => {
    // console.log("ACTION ==> data dari sign in page :", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const keepLogin = (data) => {
    return async (dispatch) => {
        try {
            // menjalankan axios
            let res = await axios.get(`http://localhost:2010/users?email=${data.email}&password=${data.password}`)
            // cara menyimpan data kereducer
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data[0]
            })
            localStorage.setItem("data", JSON.stringify(res.data[0]))
        } catch (error) {
            console.log(error)
        }
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