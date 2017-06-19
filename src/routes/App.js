import React from 'react';
import { connect } from 'dva';
import Index from '../components/layout/Index';
import '../components/layout/common.less';

function App ({ children, location, dispatch, loading, app }) {
    const { login, user, siderFold, isNavbar, menuPopoverVisible, menuOpenKeys } = app

    const headerProps = {
        user,
        siderFold,
        location,
        isNavbar,
        menuPopoverVisible,
        switchMenuPopover () {
            dispatch({ type: 'app/switchMenuPopver' })
        },
        logout () {
            dispatch({
                type: 'app/logout',
            })
        },
        switchSider () {
            dispatch({ type: 'app/switchSider', payload: location.pathname })
        }
    }

    const siderProps = {
        siderFold,
        location,
        menuOpenKeys,
        handleClickNavMenu(value){
            dispatch({
                type: 'app/changeMenu',
                payload: value,
            })
        }
    }

    return (
        <div>
            {
                <Index
                    headerProps={headerProps}
                    siderProps={siderProps}
                    siderFold={siderFold}
                    isNavbar={isNavbar}
                    children={children}
                    location={location}
                />
            }
        </div>
    );
}

function mapStateToProps (state) {
    return {
        app: state.app,
        loading: state.loading.models.app,
    };
}

export default connect(mapStateToProps)(App);