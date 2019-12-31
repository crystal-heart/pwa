const initialState = {};
const CREATE_SUCCESS = 'create_success';
const CREATE_FAIL = 'create_fail';
const LOGIN_SUCCESS = 'login_success';

const IS_ONLINE = 'is_online';
const IS_OFFLINE = 'is_offline';

export default function noti(state = initialState, action) {
    console.log(action);

    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, showmenu: action.showmenu };
        case CREATE_SUCCESS:
            return { ...state, status: 'success', openNoti: action.open };

        case CREATE_FAIL:
            return { ...state, status: 'error', openNoti: true };
        case IS_ONLINE:
            localStorage.setItem('isOffline',false);
            break;
        case IS_OFFLINE:
            localStorage.setItem('isOffline',true);
            break;

        default:
            return state;
    }
}
