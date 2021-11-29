import axios from "axios"
import { API_URL } from "../helper"

export const getProductsActions=()=>{
    return async (dispatch) => {
        try {
            // menjalankan axios
            let res = await axios.get(`${API_URL}/products/get`)
            // cara menyimpan data kereducer
            dispatch({
                type: "GET_PRODUCT_SUCCESS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}