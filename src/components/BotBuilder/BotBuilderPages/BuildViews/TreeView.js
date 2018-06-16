import React, { Component } from 'react';
import OrgChart from 'react-orgchart';
import PropTypes from 'prop-types';
import Person from 'material-ui/svg-icons/social/person';
import 'react-orgchart/index.css';
import './TreeView.css';

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
  };
  componentDidMount() {}
  render() {
    const MyNodeComponent = ({ node }) => {
      return (
        <div className="initechNode">
          {node.type === 'bot' && (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIISURBVFhH7di/S5VRHMfxa0RG0A+kKCGkIkhHazEKatAGB0EhCIeQhgajbBBqqSmJgiASKxpqkNZwcBBdRHELyoZESpD8A5QITNT0/TG/8CXO/eG9Hp8LPR94Dc+X5+F8eTj3nPPczP+U43iHGxtXZZinWMMyKlUot7yEGpSDKpRDDuAORvAL1uAUXuEcEksH5mFNZfMBR7FjqcALhJrJ5gfOYEfyAKEm8lGTVYgazakVhBooxHtEzQBssFk046GreZNoQq+rraIOUXII/u31wPITVje3oOyHrz9ClLTAD/Qdl9Dtat5HnMcTV5MJREkn/EDFmkOU3EdoQHmDWpzapLm5gNC9qkdJA+5lEVo+WhG69y7SlEVOQyeUL5iJ4BuGcB27sKVcxW+EJnkMw9iHgnIWS7CHtWNk+0WWYhqL7rofBUXHI3uoCzq9jLvadrmIk1Cjuv4DLVV5YwdPv+LHalDxO9RtFXLF75uvVdhMzAZPwGp+fw9G3xJ2s37BlpgN1sBqj1XIlbRBp6gG98DWPz8fYjaol6KDrGraq/OmDc9xeOPqb8bw7wClugBLO56h6O/pPoQGKZY2Av8CSs4xfEZosK1Sczex7dmNejSW4DKOII1lL+yYH6KpkWi0VITmmRlEotH/LaHGjP7QTDQ6CX9CqDm5gsRTjbf4CjvOj+Ia0qTJnUxmHfGs+A6k/UOLAAAAAElFTkSuQmCC"
              alt="bot icon"
              style={styles.botIcon}
            />
          )}
          {node.type === 'user' && <Person style={styles.icon} />}&nbsp;{
            node.name
          }
        </div>
      );
    };
    return (
      <div>
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
    height: '25px',
    verticalAlign: 'middle',
    width: '21px',
    color: 'rgb(66, 133, 245)',
  },
};
TreeView.propTypes = {
  treeData: PropTypes.object,
};
export default TreeView;
