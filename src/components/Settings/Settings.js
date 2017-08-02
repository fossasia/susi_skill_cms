import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';

export default class Settings extends React.Component {

    render() {
        return(
            <div>
              <StaticAppBar {...this.props} />
              <h1 style={styles.bg}>Settings</h1>
            </div>

        )
    }
}

const styles = {
    bg: {
        height: '90px',
        lineHeight:'90px',
        textAlign: 'center',
        padding: "80px 30px 30px",
    }
}
