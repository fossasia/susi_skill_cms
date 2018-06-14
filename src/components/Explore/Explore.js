import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Cookies from 'universal-cookie';
import './Explore.css';

const cookies = new Cookies();

const styles = {
    bg: {
        textAlign: 'center',
        padding: '30px',
    },
    loggedInError: {
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'bold',
        marginBottom: '100px',
        fontSize: '50px',
        marginTop: '300px'
    }
};

class Explore extends React.Component {

    render() {

    	if(!cookies.get('loggedIn'))
        {
            return (
                <div>
                    <StaticAppBar {...this.props} />
                    <div>
                        <p style={styles.loggedInError}>
                            Please login to view the Metrics page.
                        </p>
                    </div>
                </div>
            );
        }

        return(
          <div>
            <StaticAppBar {...this.props} />
          </div>
       )
    }
}


Explore.propTypes = {
};

export default Explore;
