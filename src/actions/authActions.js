import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import {LOGOUT_CURRENT_USER, SET_CURRENT_USER} from '../constants';

export const setCurrentUser =user=>{
    return{
        type:SET_CURRENT_USER,
        user 
    }
}
export const logoutCurrentUser=()=>{
    return{
        type:LOGOUT_CURRENT_USER
    }
}
export const login=(user)=>{
    return dispatch=>{
        return axios.post('/api/login/', user).then(
            (res=>{
                const token = res.data.jwtToken;
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(jwtDecode(token)));
            })
        )
    }

}
export const logout=()=>{
    return dispatch=>{
          localStorage.removeItem('jwtToken');
          dispatch(logoutCurrentUser())
    }
}