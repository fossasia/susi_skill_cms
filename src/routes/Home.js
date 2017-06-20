import React from 'react';
import { connect } from 'dva';
import {Editor} from "../components/layout/editor.js";
function Home () {
    return (
        <div>
            {/*<MyEditor/>*/}
          <Editor/>
        </div>
    );
}

function mapStateToProps () {
    return {};
}

export default connect(mapStateToProps)(Home);
