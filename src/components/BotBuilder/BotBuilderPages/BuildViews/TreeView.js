import React, { Component } from 'react';
import OrgChart from 'react-orgchart';
import PropTypes from 'prop-types';
import Person from 'material-ui/svg-icons/social/person';
import Delete from 'material-ui/svg-icons/action/delete';
import ReactTooltip from 'react-tooltip';
import 'react-orgchart/index.css';
import './TreeView.css';

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getNodeText = text => {
    if (text.indexOf(' ') > 0) {
      return text.substr(0, text.indexOf(' ')) + '...';
    }
    return text;
  };
  handleDeleteNode = node => {
    this.props.handleDeleteNode(node);
  };
  render() {
    const MyNodeComponent = ({ node }) => {
      return (
        <div className="initechNode">
          <span className="node-content" data-tip={node.name}>
            {node.type === 'bot' && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIISURBVFhH7di/S5VRHMfxa0RG0A+kKCGkIkhHazEKatAGB0EhCIeQhgajbBBqqSmJgiASKxpqkNZwcBBdRHELyoZESpD8A5QITNT0/TG/8CXO/eG9Hp8LPR94Dc+X5+F8eTj3nPPczP+U43iHGxtXZZinWMMyKlUot7yEGpSDKpRDDuAORvAL1uAUXuEcEksH5mFNZfMBR7FjqcALhJrJ5gfOYEfyAKEm8lGTVYgazakVhBooxHtEzQBssFk046GreZNoQq+rraIOUXII/u31wPITVje3oOyHrz9ClLTAD/Qdl9Dtat5HnMcTV5MJREkn/EDFmkOU3EdoQHmDWpzapLm5gNC9qkdJA+5lEVo+WhG69y7SlEVOQyeUL5iJ4BuGcB27sKVcxW+EJnkMw9iHgnIWS7CHtWNk+0WWYhqL7rofBUXHI3uoCzq9jLvadrmIk1Cjuv4DLVV5YwdPv+LHalDxO9RtFXLF75uvVdhMzAZPwGp+fw9G3xJ2s37BlpgN1sBqj1XIlbRBp6gG98DWPz8fYjaol6KDrGraq/OmDc9xeOPqb8bw7wClugBLO56h6O/pPoQGKZY2Av8CSs4xfEZosK1Sczex7dmNejSW4DKOII1lL+yYH6KpkWi0VITmmRlEotH/LaHGjP7QTDQ6CX9CqDm5gsRTjbf4CjvOj+Ia0qTJnUxmHfGs+A6k/UOLAAAAAElFTkSuQmCC"
                alt="bot icon"
                style={styles.botIcon}
              />
            )}
            {node.type === 'user' && <Person style={styles.icon} />}&nbsp;{this.getNodeText(
              node.name,
            )}
          </span>
          {(node.type === 'user' || node.type === 'bot') && (
            <span title="delete" className="node-delete">
              <Delete
                style={{ height: '19px' }}
                className="node-delete-icon"
                onClick={() => this.handleDeleteNode(node)}
              />
            </span>
          )}
        </div>
      );
    };
    return (
      <div>
        <ReactTooltip effect="solid" place="bottom" />
        <div>
          <OrgChart
            tree={this.props.treeData}
            NodeComponent={MyNodeComponent}
          />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

const styles = {
  customWidth: {
    width: 250,
  },
  icon: {
    verticalAlign: 'middle',
  },
  botIcon: {
    height: '21px',
    verticalAlign: 'middle',
    width: '21px',
    color: 'rgb(66, 133, 245)',
  },
};
TreeView.propTypes = {
  treeData: PropTypes.object,
  handleDeleteNode: PropTypes.func,
};
export default TreeView;
