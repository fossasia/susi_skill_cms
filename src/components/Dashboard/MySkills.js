import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Cookies from 'universal-cookie';
import SelectField from 'material-ui/SelectField';
import Link from 'react-router-dom/es/Link';
import Person from 'material-ui/svg-icons/social/person';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import * as $ from 'jquery';
import Add from 'material-ui/svg-icons/content/add';
import urls from '../../Utils/urls';
import colors from '../../Utils/colors';

const cookies = new Cookies();

class MySkills extends Component {

    constructor (props) {
        super(props);
        this.state={
            skillsData:[],
            loading: true,
            openSnackbar: false,
            showMySkills: false,
            msgSnackbar:'',
            openMenu:false,
            openMenuBottom:false
        }
    }
    componentDidMount(){
        this.loadSkills();
    }

    loadSkills = () => {
        let url;
        url = urls.API_URL + '/cms/getSkillList.json?applyFilter=true&filter_name=ascending&filter_type=lexicographical';
        let self = this;
        let skillsData = [];
        $.ajax({
            url: url,
            jsonpCallback: 'pxcd',
            dataType: 'jsonp',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
              for (let i of data.filteredData) {
                  skillsData.push({
                      skill_name:i.skill_name,
                      type:'public',
                      status:'active',
                      ...i
                  })
              }
              self.setState({
                  skillsData,
                  loading:false
              });
            },
            error: function (err) {
              self.setState({
                  loading: false,
                  openSnackbar:false,
                  msgSnackbar:'Error. Couldn\'t fetch skills.'
              })
            }
        });
    }

    handleShowMySkills = (event, isInputChecked) => {
        this.setState({showMySkills:isInputChecked});
    }

    handleOnRequestChangeBottom = (value) => {
        this.setState({
            openMenuBottom: value,
        });
    }

    handleOnRequestChange = (value) => {
        this.setState({
            openMenu: value,
        });
    }
    render() {
        let skillsData = this.state.skillsData.filter( item => {
            if(!this.state.showMySkills || item.author_email === cookies.get('loggedIn')) {
                return item;
            }
            return null;
        });
        return (
            <div>
                <div style={{textAlign:'right'}}>
                    <IconMenu
                        anchorOrigin={{vertical:'bottom',horizontal:'middle'}}
                        label='Add new skill'
                        open={this.state.openMenu}
                        onRequestChange={this.handleOnRequestChange}
                        iconButtonElement={<IconButton className='add-button' iconStyle={{color:'#fff'}}><Add /></IconButton>}
                        >
                            <Link to='/skillCreator'><MenuItem leftIcon={<Add />} primaryText="Create a Skill" /></Link>
                            <Link to='/botbuilder'><MenuItem leftIcon={<Person />} primaryText="Create Skill bot" /></Link>
                    </IconMenu>
                    <RaisedButton
                        backgroundColor={colors.header}
                        onClick={()=>{this.setState({openMenu:true})}}
                        label='Create Skill'
                        labelStyle={{verticalAlign:'middle'}}
                        labelColor='#fff'
                        icon={<Add/>}
                    />
                </div>
                {!this.state.loading &&
                <span>
                    <Toggle
                        style={styles.toggle}
                        labelStyle={styles.toggleLabelStyle}
                        label='Show my skills only'
                        labelPosition='right'
                        onToggle={this.handleShowMySkills}
                        disabled={this.state.loading}
                    />
                </span>}


            {this.state.loading?
                <div className='center'>
                    <CircularProgress size={62} color='#4285f5'/>
                <h4>Loading</h4>
                </div>
                :
                <div className='table-wrap'>
                <Table className='table-root' selectable={false}>
                    <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}>
                        <TableRow >
                            <TableHeaderColumn>Skill Name</TableHeaderColumn >
                            <TableHeaderColumn>Type</TableHeaderColumn >
                        <TableHeaderColumn>Author</TableHeaderColumn >
                            <TableHeaderColumn>Status</TableHeaderColumn >
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {skillsData.map((skill, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableRowColumn style={{fontSize:'16px'}}>
                                        {skill.skill_name ?
                                            <Link to={{
                                                pathname:
                                                    '/' + skill.group +
                                                    '/' + skill.skill_name.toLowerCase().replace(/ /g, '_') +
                                                    '/' + skill.language
                                            }}>
                                                {skill.skill_name}
                                            </Link>:
                                        'NA'}
                                    </TableRowColumn>
                                    <TableRowColumn
                                        style={{fontSize:'16px'}}>
                                            {skill.type}
                                    </TableRowColumn>
                                    <TableRowColumn
                                        style={{fontSize:'16px'}}>
                                            {skill.author ? skill.author : 'NA'}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <SelectField
                                            floatingLabelText="Status"
                                            fullWidth={true}
                                            value={1}
                                            >
                                                <MenuItem value={1} primaryText="Enable" />
                                        </SelectField>
                                    </TableRowColumn>
                                </TableRow>
                            )
                        })}
                        <TableRow>

                        </TableRow>
                    </TableBody>

                </Table>
            </div>}
            {skillsData.length === 0 && !this.state.loading && <div>
                <div className='center'>
                    <br/>
                    <h2>Create your first skill or learn more about <a href='https://github.com/fossasia/susi_skill_cms/blob/master/docs/Skill_Tutorial.md' rel="noopener noreferrer" target='_blank'>SUSI Skills</a></h2>
                <br/>
                <IconMenu
                    anchorOrigin={{vertical:'bottom',horizontal:'middle'}}
                    label='Add new skill'
                    open={this.state.openMenuBottom}
                    onRequestChange={this.handleOnRequestChangeBottom}
                    iconButtonElement={<IconButton style={{display:'none'}} iconStyle={{color:'#fff'}}><Add /></IconButton>}
                >
                        <Link to='/skillCreator'><MenuItem leftIcon={<Add />} primaryText="Create a Skill" /></Link>
                        <Link to='/botbuilder'><MenuItem leftIcon={<Person />} primaryText="Create Skill bot" /></Link>
                </IconMenu>
                <RaisedButton
                    backgroundColor={colors.header}
                    onClick={()=>{this.setState({openMenuBottom:true})}}
                    label='Create Skill'
                    labelStyle={{verticalAlign:'middle'}}
                    labelColor='#fff'
                    icon={<Add/>}
                />
                </div>
            </div>}

            <Snackbar
                open={this.state.openSnackbar}
                message={this.state.msgSnackbar}
                autoHideDuration={2000}
                onRequestClose={ () => {this.setState({openSnackbar:false})}}
            />
            </div>
        );
    }
}
const styles = {
    toggle: {
        maxWidth: '180px'
    },
    toggleLabelStyle: {
        fontSize: '15px'
    },
    addButtonStyle: {
        backgroundColor: colors.fabButton,
        borderRadius:'50%',
        height: '56px',
        width: '56px',
        boxShadow: '0px 3px 13px 1px rgba(0, 0, 0, 0.23)'
    }
}

export default MySkills;
