import React from "react";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { FloatingActionButton, Paper} from "material-ui";
import ContentAdd from "material-ui/svg-icons/navigation/arrow-forward";
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Icon, notification} from 'antd';
import * as $ from "jquery";
import colors from "../../Utils/colors";
const models = [];
const groups = [];
const languages = [];

export default class BrowseExamples extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modelValue: null, groupValue:null, languageValue:null, expertValue:null, skills:[], examples:[],test : []
        };
    }
    
    componentDidMount(){
        this.loadInitialExamples();
    }

    loadInitialExamples = () => {
        let url = "http://api.susi.ai/cms/getExampleSkill.json";
        console.log(url);
        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pxcd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function(data) {
                // data = data.examples;
                let keys = Object.keys(data.examples);
                let test = keys.map((el, i) => {
                    return (<li style={styles.liStyle} key={i}>
                        <Card>
                            <CardHeader

                                title={el.match(/\/([\w]*)\.[\w]{1,5}$/)[1]}
                                subtitle={el}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                {data.examples[el].map((el, i ) => {
                                    return (<p key={i}>{el}</p>)
                                })}
                            </CardText>
                        </Card>
                    </li>)
                });

                self.setState({
                    test: test
                })

                console.log(self.state.test);

            },
            error: function(e) {
                console.log(e);
                notification.open({
                    message: 'Error Processing your Request',
                    description: 'Error in processing the request. Please try with some other skill',
                    icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
                });
            }

        });


    }

    loadmodels()
    {
        if(models.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getModel.json",
                jsonpCallback: 'pa',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (d) {
                    console.log(d);
                    for (let i = 0; i < d.length; i++) {
                        models.push(<MenuItem value={i} key={d[i]} primaryText={`${d[i]}`}/>);
                    }
                }
            });
        }
    }

     handleModelChange = (event, index, value) => {
        this.setState({modelValue: value});
        if(groups.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getGroups.json",
                jsonpCallback: 'pb',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        groups.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
                    }
                }
            });
        }
    }

    handleGroupChange = (event, index, value) => {
        this.setState({groupValue: value});
        if(languages.length===0) {
            $.ajax({
                url: "http://api.susi.ai/cms/getAllLanguages.json",
                jsonpCallback: 'pc',
                dataType: 'jsonp',
                jsonp: 'callback',
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        languages.push(<MenuItem value={i} key={data[i]} primaryText={`${data[i]}`}/>);
                    }
                    console.log("languages ", languages)
                }
            });
        }
    }

    handleLanguageChange = (event, index, value) => this.setState({languageValue: value});

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    buttonClick = () => {
        let url = "http://api.susi.ai/cms/getExampleSkill.json?model="+models[this.state.modelValue].key+"&group="+groups[this.state.groupValue].key+"&language="+languages[this.state.languageValue].key;
        console.log(url);
        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pxcd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function(data) {
                // data = data.examples;
                let keys = Object.keys(data.examples);
                if(keys.length===0){
                    notification.open({
                        message: 'Error Processing your Request',
                        description: 'Error in processing the request. Please try with some other skill',
                        icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
                    });
                }
                let test = keys.map((el, i) => {
                    return (<li style={styles.liStyle} key={i}>
                        <Card>
                            <CardHeader
                                title={el.match(/\/([\w]*)\.[\w]{1,5}$/)[1]}
                                subtitle={el}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />

                            <CardText expandable={true}>
                                {data.examples[el].map((el, i ) => {
                                    return (<p key={i}>{el}</p>)
                                })}
                            </CardText>
                        </Card>
                    </li>)
                });

                self.setState({
                    test: test
                })

                console.log(self.state.test);

            },
            error: function(e) {
                console.log(e);
                notification.open({
                    message: 'Error Processing your Request',
                    description: 'Error in processing the request. Please try with some other skill',
                    icon: <Icon type="close-circle" style={{ color: '#f44336' }} />,
                });
            }

        });
    }

    render() {

        const style = {
            width: "100%",
            padding: "10px"
        };

        return (
            <div style={styles.container}>
                <Paper style={style} zDepth={1}>
                    <div style={styles.center}>
                        <SelectField
                            floatingLabelText="Model"
                            style={{width:'130px'}}
                            value={this.state.modelValue}
                            onChange={this.handleModelChange}
                            onMouseEnter={this.loadmodels}
                        >
                            {models}
                        </SelectField>
                        <SelectField
                            floatingLabelText="Group"
                            style={{width:'160px'}}
                            value={this.state.groupValue}
                            onChange={this.handleGroupChange}
                        >
                            {groups}
                        </SelectField>
                        <SelectField
                            floatingLabelText="Language"
                            style={{width:'100px',marginRight:"10px"}}
                            value={this.state.languageValue}
                            onChange={this.handleLanguageChange}

                        >
                            {languages}
                        </SelectField>
                        <FloatingActionButton  backgroundColor={colors.fabButton} style={{marginLeft: 25}} onClick={this.buttonClick}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>

                </Paper>

                <div style={{marginTop:"20px",   marginBottom: "40px",
                    textAlign: "justify",
                    fontSize: "0.1px", width: "100%"}}>

                    <ul id="Grid">
                        {this.state.test}
                    </ul>

                </div>
            </div>
        );
    }
}

const styles = {

    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    liStyle: {
        width: "100%",
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%"
    },
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },

}
