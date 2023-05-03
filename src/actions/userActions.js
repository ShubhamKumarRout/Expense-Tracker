import axios from "axios"
import swal from 'sweetalert';

export const startRegisterUser = (data,props) => {
    return (dispatch) => {
        axios.post('http://127.0.0.1:3080/user/register', data)
            .then(res => {
                const result = res.data
                if (result.hasOwnProperty('errors')) {
                    dispatch(setErrors(result.errors))
                }
                else {
                    dispatch(registerUser(result))
                    dispatch(setErrors({}))
                    swal("You have successfully registered");
                    props.history.push('/LoggedOutHome/login')
                }


            })
            .catch(err => {
                console.log(err);
            })
    }
}

const registerUser = (data) => {
    return ({
        type: 'REGISTER_USER',
        payload: data
    })
}

const setErrors = (data) => {
    return ({
        type: 'SET_ERRORS',
        payload: data
    })
}

export const startUserLogin = (data,handleAuth,props) => {
    return (dispatch) => {
        axios.post('http://127.0.0.1:3080/user/login', data)
            .then(res => {
                const result = res.data

                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                    dispatch(setErrors(result.errors))
                }
                else {
                    localStorage.setItem('token', result.token)
                    dispatch(setErrors({}))
                    dispatch(startGetUser())
                    swal("Log In Successfull");
                    handleAuth()
                    props.history.push('/LoggedInHome/Home')
                }
            })
    }
}



export const startGetUser = () => {
    const token = localStorage.getItem('token') //checking if token is present or not

    return (dispatch) => {

        if (token) {
           
            axios.get('http://127.0.0.1:3080/user/userInfo', {
                headers: {
                    'x-auth': token
                }
            })
                .then(res => {
                    const result = res.data
                    dispatch(setUserInfo(result))
                })
                .catch(err => {
                    dispatch(setErrors(err.message));
                })
        }
    }


}

const setUserInfo = (data) => {
    return ({
        type: 'SET_USER_INFO',
        payload: data
    })
}