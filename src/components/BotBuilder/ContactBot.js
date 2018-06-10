import React from 'react';
import StaticAppBar from '../StaticAppBar/StaticAppBar.react';
import Snackbar from 'material-ui/Snackbar';
import Cookies from 'universal-cookie';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Paper } from 'material-ui';
import './BotBuilder.css';

const cookies = new Cookies();

class ContactBot extends React.Component {
	constructor(){
		super();
		this.state={
			copied:false
		}
	}

	render() {
		return (
			<div>
				<StaticAppBar {...this.props} />
				<div style={styles.home} className="botbuilder-page-wrapper">
					<Paper style={styles.paperStyle} className="botBuilder-page-card" zDepth={1}>
						<div style={{padding: '40px 40px 40px 40px', textAlign: 'center'}}>
							<h1>The SUSI AI Contact bot for your website is ready!</h1><br/>
							<div className="code-box">
								<code>
									&lt;script type=&quot;text/javascript&quot; id=&quot;susi-bot-script&quot; data-token=&quot;{cookies.get('loggedIn')}&quot; src=&quot;https://skills.susi.ai/susi-contactbot.js&quot;&gt;&lt;/script&gt;
								</code>
								<CopyToClipboard text={'<script type=\'text/javascript\' id=\'susi-bot-script\' data-token=\''+cookies.get('loggedIn')+'\' src=\'https://skills.susi.ai/susi-contactbot.js\'></script>'}
								onCopy={() => this.setState({copied: true})}>
								<span className='copy-button'>copy</span>
							</CopyToClipboard>
						</div>
							<h4>Paste the above code just above
								<i> &lt;/body&gt; </i>
							tag in your website.</h4>
					</div>
					</Paper>
				</div>
				<Snackbar
					open={this.state.copied}
					message='Copied to clipboard!'
					autoHideDuration={2000}
					onRequestClose={()=>{this.setState({copied:false})}}
				/>
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
