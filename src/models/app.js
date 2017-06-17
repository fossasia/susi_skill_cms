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

    },
    reducers: {

    },
    subscriptions: {

    },
};
