
import React from 'react';


export default class NotFound extends React.Component {


    render() {
        return(
            <div>
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
        marginLeft:'80px'
    }
}
