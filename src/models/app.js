import * as appServices from '../services/app';
import config from '../utils/config';
import { notification } from 'antd';

export default {
    namespace: 'app',
    state: {
        isNavbar: document.body.clientWidth < 769,
        user: JSON.parse(sessionStorage.getItem('user')) || { nickname: 'guest' },
        menuOpenKeys: [],
    },
    effects: {


        *changeNavbar ({}, { put }) {
            if (document.body.clientWidth < 769) {
                yield put({ type: 'showNavbar' })
            } else {
                yield put({ type: 'hideNavbar' })
            }
        },
    },
    reducers: {
        switchSider (state, action) {
            localStorage.setItem('antdAdminSiderFold', !state.siderFold)
            return {
                ...state,
                siderFold: !state.siderFold,
                menuOpenKeys: state.siderFold ? action.payload.split('/') : [null],
            }
        },
        showNavbar (state) {
            return {
                ...state,
                isNavbar: true
            }
        },
        hideNavbar (state) {
            return {
                ...state,
                isNavbar: false
            }
        },
        switchMenuPopver (state) {
            return {
                ...state,
                menuPopoverVisible: !state.menuPopoverVisible,
            }
        },
// change the menu
        changeMenu(state, action){
            return {
                ...state,
                menuOpenKeys: action.payload,
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }){
            window.onresize = () => dispatch({ type: 'changeNavbar' })
            history.listen(({ pathname }) => {
                if (pathname==='/login') {
                    notification.error({ message: 'Error', description: 'Please sign in' });
                    dispatch({ type: 'logoutSuccess' });
                    history.push('/');

                } else {
                    dispatch({
                        type: 'changeMenu',
                        payload: localStorage.getItem('antdAdminSiderFold')==='true' ? [] : pathname.split('/'),
                    })
                }
            })

        }
    },
};