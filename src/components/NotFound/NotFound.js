import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';

export default class NotFound extends React.Component {

    render() {
        return(
            <div>
                <StaticAppBar {...this.props} />
                <h1 style={styles.bg}>404 &nbsp; :(</h1>
            </div>
        )
    }
}

const styles = {
    bg: {
        height: '90px',
        lineHeight:'90px',
        textAlign: 'center',
        fontSize:'200px',
        padding: "100px 30px 30px",
    }
};
