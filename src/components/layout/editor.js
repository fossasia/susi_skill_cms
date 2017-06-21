import CodeMirror from 'react-codemirror';
import React from 'react';
import { connect } from 'dva';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/mode/go/go';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import './editor.css';
import { Menu, Icon, Popover } from 'antd'
import styles from './main.less'
import Menus from './Menus';
import 'font-awesome/css/font-awesome.min.css';
import FontAwesome  from 'react-fontawesome';

import * as FileSaver from 'file-saver';
const SubMenu = Menu.SubMenu

export class Editor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code: '//code'
        }
    }
    updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }

    componentDidMount() {
        if (this.props.snippet) {
            this.props.getSnippet(this.props.snippet);
        }
    }

    render() {
        const options = {
            autofocus: true,
            lineNumbers: true,
            lineWrapping: true,
            viewportMargin: Infinity,
            mode: this.props.language,
            readOnly: this.props.snippet ? 'nocursor' : false,
        };

        function makeFile(code) {
            // do some calculations
            console.log(code)
            let blob = new Blob([code], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, "DemoFile.txt");

        }

        const creationControls = this.props.snippet ?
            undefined :
            (<div id="options">
                {/*<Button*/}
                {/*className="pt-intent-primary"*/}
                {/*text="Download"*/}

                {/*/>*/}

            </div>);
        var divStyle = {
            marginTop: 50,

        };
        return (
            <div id="editor" style={divStyle}>
              <Menu className='header-menu'  mode='horizontal'>

                <SubMenu  className="submenu-header"  title={
                  <span >
          <FontAwesome    name=" fa-play"/>
                      {"     Run"}
            </span>
                }
                />

                <SubMenu title={
                  <span onClick={() => makeFile(this.state.code)}>
          <FontAwesome name=" fa-download Save"/>
                      {"     Save"}
            </span>
                }
                />

                <SubMenu title={
                  <span>
          <FontAwesome name=" fa-align-left Indent"/>
                      {"     Indent"}
            </span>
                }
                />

              </Menu>
                {creationControls}

              <CodeMirror value={this.state.code} options={options} onChange={this.updateCode.bind(this)} />

            </div>
        );
    }

}

const mapStateToProps = store => ({
    text: store.editor.text,
    language: store.editor.language,
});


export default (connect(<mapStateToProps></mapStateToProps>)(Editor));
// export default (Editor);
