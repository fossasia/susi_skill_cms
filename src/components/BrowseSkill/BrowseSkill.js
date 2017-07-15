import React from 'react';
import * as $ from "jquery";
import {Card, CardTitle} from 'material-ui/Card';
import {GridList} from "material-ui";



export default class BrowseHistory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          test : []
        };
        this.LoadSkills();
    }
    LoadSkills() {

            let url = "http://api.susi.ai/cms/getSkillList.json?model=general&group=knowledge&language=en";
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
                    let test = keys.map((el, i) => {
                        return (
                            <Card style={style.row} key={el}>
                                <CardTitle
                                    title={data[el]}
                                />
                            </Card>
                        )
                    });

                    self.setState({
                        test: test
                    })

                    console.log(self.state.test);

                }

            });

    };

    render() {

        return (
            <div style={style.root}>
                <h1>Knowldege</h1>
                <div className="row" style={style.scro}  >
                    <GridList style={style.gridList} cols={2.2}>
                        {this.state.test}

                    </GridList>
                </div>
            </div>


        );
    }
}

const style = {
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%"
    },
    row: {
        margin: 20,
        width: 250,
        overflow:'hidden',
        height: 150,
        textAlign: 'center',
        display: 'inline-block',
    },
    scro: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: "100%"
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        flexDirection: "row",

    },

};