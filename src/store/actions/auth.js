import axios from 'axios';
import * as actionTypes from './actionTypes';

const APIKEY = 'AIzaSyCppwtjwdw42wfZ1KqnUEZIRLpV7RYj8Xk';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };

};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        //const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+APIKEY;
        const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+APIKEY;
        
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date( new Date().getTime() + (response.data.expiresIn * 1000) );
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId')
            if (expirationDate > new Date()){
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(30));
            } else {
                dispatch(logout());
            }

        }
    };
};