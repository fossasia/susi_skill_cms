import React, {Component} from 'react';
import $ from 'jquery';
import {Card, CardTitle} from 'material-ui/Card';
// import Dialog from 'material-ui/Dialog';


export default class ListUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: []
        }
    }

    componentDidMount() {

        let url;
        url = "http://api.susi.ai/aaa/account-permissions.json";
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'py',
            jsonp: 'callback',
            crossDomain: true,
            success: function (response) {
                console.log(response.userRole)
                if (response.userRole !== "admin") {
                    console.log("Not an admin")
                } else {
                    this.fetchUsers();
                    console.log("Admin")
                }
            }.bind(this),
            error: function (errorThrown) {
                console.log(errorThrown)
            }
        });
    }

    fetchUsers = () => {
        let url;
        url = "http://api.susi.ai/aaa/getAllUsers.json";
        let self = this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: 'pu',
            jsonp: 'callback',
            crossDomain: true,
            success: function (data) {
                console.log(data.username)
                data = data.username
                let keys = Object.keys(data);
                let username = keys.map((el, i) => {
                    return (
                        <Card style={styles.row} key={el}>
                            <div style={styles.right}>
                                <CardTitle
                                    title={data[el].replace("email:","")}
                                    titleStyle={{'fontSize': '18px'}}
                                />
                            </div>
                            <div>
                                {/*Empty div for user roles*/}
                            </div>
                        </Card>
                    )
                });
                self.setState({
                    username : username,
                })
                console.log(self.state)
            },
            error: function (errorThrown) {
                console.log(errorThrown)
            }
        });
    }

    render() {
        return (
            <div>
                <div style={{marginTop:"20px",   marginBottom: "40px",
                    textAlign: "justify",
                    fontSize: "0.1px", width: "100%"}}>
                    <div className="row" style={styles.scroll}  >
                        <div style={styles.gridList}>
                            {this.state.username}

                        </div>
                    </div>
                </div>
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
    liStyle: {
        width: "100%",
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%"
    },
    propContainer: {
        width: 100,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
    row: {
        width: 210,
        height: 120,
        margin:"10px",
        overflow:'auto',
        justifyContent: "center",
        fontSize: '10px',
        textAlign: 'center',
        display: 'inline-block',
    },
    scroll: {
        display: 'flex',
        flexWrap: 'nowrap',
        width: "100%"
    },
    gridList: {
        flexWrap: 'wrap',
        flexDirection: "row",
        margin:"10px",
        textAlign:"center"
    },
    right: {
        display: 'flex',
        alignItems:"center",
        flexDirection: 'row',
        padding: "10px",
    },
}
