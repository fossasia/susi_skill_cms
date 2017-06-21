import React from 'react';
import { connect } from 'dva';
import {Editor} from "../components/layout/editor.js";
import Iframe from 'react-iframe'
function Home () {
    return (
        <div>
            {/*<MyEditor/>*/}

          <Editor/>
            <Iframe url="http://chat.susi.ai/"
                    styles={{
                        width: "400px",
                        height:"580px",
                        position: 'absolute',
                        bottom: "-90px",
                        right: 0
                    }}
                    allowFullScreen/>

        </div>
    );
}

function mapStateToProps () {
    return {};
}

export default connect(mapStateToProps)(Home);
