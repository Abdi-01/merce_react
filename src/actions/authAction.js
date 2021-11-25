import axios from "axios"
import { API_URL } from "../helper"

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
            let res = await axios.post(`${API_URL}/users/keep-login`,{
                email:data.email,
                password:data.password
            })
            // cara menyimpan data kereducer
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data.results[0]
            })

            // conth pemanggilan fungsi action lain 
            // dispatch(getTransactionUser(res.data[0].id))

            // menyimpan data ke local storage
            localStorage.setItem("data", JSON.stringify(res.data.results[0]))
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

export const updateCartAction = (data, idUser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`http://localhost:2010/users/${idUser}`, {
                cart: data
            })
            dispatch({
                type: "UPDATE_CART",
                payload: res.data.cart
            })

            return { success: true }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getTransactionUser = (iduser) => {
    console.log(iduser)
    return async (dispatch) => {
        try {
            let res = await axios.get(API_URL + `/userTransactions?iduser=${iduser}`)
            dispatch({
                type: "GET_TRANSACTIONS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}