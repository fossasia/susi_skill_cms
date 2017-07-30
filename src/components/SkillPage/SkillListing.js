import React from 'react';
import {Link} from 'react-router-dom'
import 'brace/mode/markdown';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import * as $ from "jquery";
import {Paper} from "material-ui";
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import './SkillListing.css';


const skillData = {
    name:'Lizard Spoke Game',
    desc:'The game Rock, Paper, Scissors, Lizard, Spock. It is an expansion to the game Rock, Paper, Scissors. We both will  pick a variable and reveal. The winner will be  one who defeats the others. It goes like Scissors cuts Paper,Paper covers Rock, Rock crushes Lizard, Lizard poisons Spock, Spock smashes Scissors, Scissors decapitates Lizard, Lizard eats Paper, Paper disproves Spock, Spock vaporizes Rock, (and as it always has) Rock crushes Scissors.,',
    author:"saurabhjn76",
    authorUrl:'https://github.com/saurabhjn76',
    examples:["Let's play a game","I am bored", "Suggest a game"],
    tncUrl:"http://ispum.com",
    dppUrl:"http://lorem.com",
    thmb:"https://raw.githubusercontent.com/fossasia/susi_skill_data/fcae50dd3f0b4e34b19d306df53112cae1a60fdd/models/general/entertainment/en/lizard_spoke_game.png",
    isDynamic:true
};

export default class SkillListing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            code:"// code", fontSizeCode:14, editorTheme:"github"
        };

    }

    componentDidMount() {
        // let element = this.props.location.state.element
        let url = this.props.location.state.url;
        let name = this.props.location.state.name;
        name = name.replace(".txt","")
        console.log(url)
        if(url.indexOf("model") < 0) {
            url = this.props.location.state.url + "?skill=" + name;
        }
        else {
            url = this.props.location.state.url + "&skill=" + name;
        }

        url = url.toString()
        url =  url.replace("getSkillList","getSkill");
        console.log(url)
        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pc',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                self.updateCode(data.text)
            }
        });
    };

    updateCode = (newCode) => {
        this.setState({
            code: newCode,
        });
        console.log(this.state.code);
    }


    render() {
        

        const exampleStyle ={
            height:'auto',
            width: 200,
            marginRight: 20,
            textAlign: 'left',
            display: 'inline-block',
            boxShadow:'none',
            backgroundColor:'whitesmoke',
            padding:'20px',
            color:'#555'
        }

        const styles = {
            home: {
                width: '100%',
                fontSize:'14px'
            },
            right: {
                display: 'flex',
                alignItems:"center",
                flexDirection: 'row',
                padding: "10px",
            },
            paper_full_width : {
                width: "100%",
                marginBottom:10,
                display: 'inline-block',
            }
        };



        return (
            <div style={styles.home}>
                <div className="avatar-meta margin-b-md">
                    <div className="avatar">
                        <Avatar
                            src={skillData.thmb}
                            size={250}
                        />
                    </div>
                    <div className="meta">
                        <h1 className="name">
                            {skillData.name}
                        </h1>
                        <h4>
                            <Link to={skillData.authorUrl}>{skillData.author}</Link>
                        </h4>
                        <div className="examples">
                            {skillData.examples.map((data)=>{
                                return <Paper style={exampleStyle}  zDepth={1}>{data}</Paper>
                            })}
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="desc margin-b-md margin-t-md">
                    <h1 className="title">
                        Description
                    </h1>
                    <p>{skillData.desc}</p>
                </div>
                <div className="margin-b-md margin-t-md skill">
                    <h1 className="title">
                        Skills Details
                    </h1>
                    <ul>
                        {skillData.isDynamic?<li>The Skill Contains content Dynamic Content that is updated real-time based on inputs from the User.</li>:''}
                        <li><Link to={skillData.tncUrl}>Term & Condition</Link></li>
                        <li><Link to={skillData.dppUrl}>Developer Privacy Policy</Link></li>
                    </ul>
                </div>
                {

                    /* <Paper style={styles.paper_full_width}  rounded={false} >
                     <div style={styles.right}>
                     <CircleImage name="Susi Wikipedia" size="48"/>
                     <div style={{marginLeft:10, flex: 1}}>
                     <p style={{fontWeight: 'bold'}}>Wikipedia Skill</p>
                     <p>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.
                     </p>
                     </div>
                     <FloatingActionButton backgroundColor="#f44336">
                     <Save/>
                     </FloatingActionButton>
                     </div>

                     </Paper>
                     <AceEditor
                     mode="markdown"
                     theme={this.state.editorTheme}
                     width="100%"
                     fontSize={this.state.fontSizeCode}
                     height= "600px"
                     value={this.state.code}
                     name="skill_code_editor"
                     editorProps={{$blockScrolling: true}}
                     />*/}

            </div>

        );
    }
}