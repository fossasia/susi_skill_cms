import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';


const style = {
    row: {
        margin: 20,
        width: 200,
        height: 150,
        textAlign: 'center',
        display: 'inline-block',
    },
    scro: {
        overflow:'auto',
    }

};

 export default class BrowseExamples extends React.Component {
    render() {
        return (
            <div>
                <h1>Knowldege</h1>
                <div className="row" style={style.scro} >
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                </div>
                <h1>Entertainment</h1>
                <div className="row" style={style.scro}>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                </div>
                <h1>Assistant</h1>
                <div className="row" style={style.scro}>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                    <Card style={style.row}>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                    </Card>
                </div>
            </div>


        );
    }
}
