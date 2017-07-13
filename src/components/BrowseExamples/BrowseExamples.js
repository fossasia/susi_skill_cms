import React from "react";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import { FloatingActionButton, Paper} from "material-ui";
import ContentAdd from "material-ui/svg-icons/navigation/arrow-forward";
import * as $ from "jquery";
const models = [];
const groups = [];
const languages = [];


export default class BrowseExamples extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modelValue: null, groupValue:null, languageValue:null, expertValue:null, skills:[],
        };

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

    handleChange = (event) => {
        this.setState({height: event.target.value});
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
                data = data.examples;
                for( let i=0;i<Object.keys(data).length;i++){
                    self.state.skills[i]=Object.keys(data)[i];
                }
                console.log(self.state.skills);

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
                        <FloatingActionButton style={{marginLeft: 25}} onClick={this.buttonClick}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>

                </Paper>
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