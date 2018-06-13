import React, {Component} from 'react';
import OrgChart from 'react-orgchart';
import Android from 'material-ui/svg-icons/action/android';
import Person from 'material-ui/svg-icons/social/person';
import 'react-orgchart/index.css';
import './TreeView.css';

const treeData = {
  name: 'Welcome!',
  children: [
    {
      name: 'User query 1',
      type: 'user',
      children: [
        {
          name: 'Answer for the user query',
          type: 'bot',
        }
      ]
    },
    {
      name: 'User query 2',
      type: 'user',
      children: [
        {
          name: 'Answer for the user query',
          type: 'bot',
        }
      ]
    },
    {
      name: 'User query 3',
      type: 'user',
      children: [
        {
          name: 'Answer for the user query',
          type: 'bot',
        }
      ]
    }
  ]
};
class TreeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  handleChange = (event, index, value) => {
    this.setState({value});
  }
  componentDidMount(){
  }
  render() {
    const MyNodeComponent = ({node}) => {
      return (
        <div className='initechNode'>{node.type==='bot' && <Android color='#4285f5' style={styles.icon}/>}{node.type==='user' && <Person style={styles.icon}/>}&nbsp;{ node.name }</div>
      );
    };
    return (
      <div>
        <div>
            <OrgChart tree={treeData} NodeComponent={MyNodeComponent} />
          <br/>
          <br/>
        </div>
      </div>
    );
  }
}

const styles = {
  customWidth: {
    width: 250
  },
  icon:{
    verticalAlign: 'middle'
  }
};

export default TreeView;
