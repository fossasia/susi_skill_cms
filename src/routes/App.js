import React from 'react';
import { connect } from 'dva';
import Index from '../components/layout/Index';
import '../components/layout/common.less';

function App ({ children, location, dispatch, loading, app }) {
    const { login, user, siderFold, isNavbar, menuPopoverVisible, menuOpenKeys } = app

    const headerProps = {
        user,

    }

    const siderProps = {
        siderFold,
        location,
        menuOpenKeys,
    }

    return (
        <div>
            {
              <Index
                  headerProps={headerProps}
                  siderProps={siderProps}

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
