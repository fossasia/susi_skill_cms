import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';

export default class NotFound extends React.Component {

    render() {
        return(
            <div>
                <StaticAppBar {...this.props} />
                <h1 style={styles.bg}>404 &nbsp; :(</h1>
                <h2 style ={styles.h2Style}>Not Found</h2>
            </div>
        )
    }
}

const styles = {
    bg: {
        lineHeight:'90px',
        textAlign: 'center',
        fontSize:'80px',
        padding: "100px 30px 30px",
    },
    h2Style:{
        textAlign: 'center'
    }
};
