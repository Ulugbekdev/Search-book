const GET_LOGIN = 'GET-LOGIN';

const defualtState = {
    isLogin: false,
    login: ''
}

export default function loginReducer(state = defualtState, action) {
    switch (action.type) {
        case GET_LOGIN:
            return {
                ...state,
                isLogin: true,
                login: action.login
            }
        default:
            return state
    }
}

export const getLoginAc = login => ({ type: GET_LOGIN, login });

export const getLogin = login => dispatch => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('token', login);
            resolve(dispatch(getLoginAc(localStorage.getItem('token'))));
        }, 3000);
    })
}