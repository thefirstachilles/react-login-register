import {SET_CURRENT_USER} from '../constants';
import { LOGOUT_CURRENT_USER } from '../constants';
import isEmpty from 'lodash/isEmpty';

const initialState={
    user:{},
    isAuthenticated: false, //保存是否已经登录
};
const auth = (state=[], action={}) => {
    switch(action.type){
        case SET_CURRENT_USER:
        return {
            isAuthenticated: !isEmpty(action.user),
            user: action.user
        }
        case LOGOUT_CURRENT_USER:
            return[
                ...state,
                {isAuthenticated: false,
                user: {}
            }]
        default:
            return state;
    }
}
export default auth;