// Setup default value
const INITIAL_STATE = {
    id: null,
    email: "",
    role: ""
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("REDUCER ==> Data dari authAction :", action.payload)
            // proses penyimpanan ke globalStorage, menggunakan concatination
            return { ...state, ...action.payload }
        default:
            return state;
    }

}