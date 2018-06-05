import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Cookies from 'universal-cookie';
import { Paper } from 'material-ui';
import './BotBuilder.css';

const cookies = new Cookies();

class ContactBot extends React.Component {
	render() {
		return (
			<div>
				<StaticAppBar {...this.props} />
				<div style={styles.home}>
					<Paper style={styles.paperStyle} className="botBuilder-page-card" zDepth={1}>
					<div style={{padding: '40px 40px 40px 40px', textAlign: 'center'}}>
						<h1>The SUSI AI Contact Bot for your website is ready!</h1><br/>
						<div className="code-box">
							<code>
								&lt;script type=&quot;text/javascript&quot; id=&quot;susi-bot-script&quot; data-token=&quot;{cookies.get('loggedIn')}&quot; src=&quot;https://skills.susi.ai/susi-contactbot.js&quot;&gt;&lt;/script&gt;
							</code>
						</div>
							<h4>Paste the above code just above
								<i> &lt;/body&gt; </i>
							tag in your website</h4>
					</div>
					</Paper>
				</div>
		 	</div>
		);
	}
}

const styles = {
	home: {
        width: '100%'
    },
	paperStyle: {
		width: '100%',
		marginTop:'20px'
	}
}

export default ContactBot;
