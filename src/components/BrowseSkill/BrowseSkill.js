import React from "react";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { FloatingActionButton, Paper} from "material-ui";
import ContentAdd from "material-ui/svg-icons/navigation/arrow-forward";
import {Card, CardTitle} from 'material-ui/Card';
import * as $ from "jquery";
import Link from "react-router-dom/es/Link";
const models = [];
const groups = [];
const languages = [];

export default class BrowseSkill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modelValue: "general", skillURL:null, groupValue:"knowledge", languageValue:"en", expertValue:null, skills: [], first_open:true
        };
    }

    componentDidMount(){
        this.buttonClick()

    }
    loadModels()
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
        let url;
        if(models.length>0&&languages.length>0&&groups.length>0) {
            console.log(models)
           url  = "http://api.susi.ai/cms/getSkillList.json?model=" + models[this.state.modelValue].key + "&group=" + groups[this.state.groupValue].key + "&language=" + languages[this.state.languageValue].key;
        }
        else{
            url = "http://api.susi.ai/cms/getSkillList.json"
        }
        console.log(models)

        console.log(url);

        let self = this;
        $.ajax({
            url: url,
            jsonpCallback: 'pxcd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                data = data.skills;
                let keys = Object.keys(data);
                let skills = keys.map((el, i) => {
                    return (
                        <Link key={el}
                              to={{
                                  pathname: '/skillPage',
                                  state: { url: url, element: el, name: data[el]}
                              }}>
                            <Card style={styles.row} key={el}>
                                <CardTitle
                                    title={data[el]}
                                    titleStyle={{'fontSize':'18px'}}
                                />
                            </Card>
                        </Link>
                    )
                });

                self.setState({
                    skills : skills,
                    skillURL: url
                })
                console.log(self.state)

            }
        });
    };


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
                            onMouseEnter={this.loadModels}
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
                        <FloatingActionButton style={{marginLeft: 25}} onClick={this.buttonClick}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>

                </Paper>

                <div style={{marginTop:"20px",   marginBottom: "40px",
                    textAlign: "justify",
                    fontSize: "0.1px", width: "100%"}}>
                    <div className="row" style={styles.scroll}  >
                        <div style={styles.gridList}>
                            {this.state.skills}

                        </div>
                    </div>
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
        width: 100,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
    row: {
        width: 210,
        height: 120,
        margin:"10px",
        overflow:'auto',
        justifyContent: "center",
        fontSize: '10px',
        textAlign: 'center',
        display: 'inline-block',
    },
    scroll: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: "100%"
    },
    gridList: {
        flexWrap: 'wrap',
        flexDirection: "row",
        margin:"10px",
        textAlign:"center"
    },
}
