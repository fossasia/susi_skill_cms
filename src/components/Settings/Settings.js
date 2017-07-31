import React from 'react';


export default class Settings extends React.Component {


    render() {
        return(
            <div>
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
        marginLeft:'80px'
    }
}
