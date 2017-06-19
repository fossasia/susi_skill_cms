import React from 'react';
import { Router } from 'dva/router';
import { browserHistory } from 'react-router';
function RouterConfig({ history, app }) {
  function makeRoute(name, needModel = false) {
    return {
      path: name,
      name,

      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          if (needModel && !app._models.some(val => (val.namespace === url))) { app.model(require(`./models/${url}`)); }

          cb(null, require(`./routes/${url}`));
        });
      },
    };
  }

  const routes = [
    {
      path: '/',
      name: 'app',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/App'));
        });
      },
      indexRoute: {
        name: 'home',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/Home'));
          });
        },
      },
      childRoutes: [
        {
          path: 'login',
          name: 'login',
        },

        makeRoute('home'),

      ],
    },
  ];

  return (
    <Router history={browserHistory} routes={routes} />
  );
}

export default RouterConfig;
