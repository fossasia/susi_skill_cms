const styles = {

    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imageContainer:{
        position: 'relative',
        height: '80px',
        width: '80px',
        verticalAlign: 'top'
    },
    name:{
        textAlign: 'left',
        fontSize: '15px',
        color: '#4285f4',
        margin: '4px 0'
    },
    details:{
        paddingLeft:'10px'
    },
    image:{
        maxWidth: '100%',
        border: 0
    },
    feedback:{
        color:'#4285f4',
        fill:'#4285f4',
        display: "flex",
    },
    description:{
        textAlign:'left',
        fontSize: '14px'
    },
    listStyle: {
        width: "100%",
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        padding: "80px 30px 30px",
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
        width: 280,
        height: 250,
        minHeight:'200px',
        margin:"10px",
        overflow:'hidden',
        justifyContent: "center",
        fontSize: '10px',
        textAlign: 'center',
        display: 'inline-block',
        background: '#f2f2f2',
        borderRadius: '5px',
        backgroundColor: '#f4f6f6',
        border: '1px solid #eaeded',
        padding: '4px',
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
        padding: "8px",
        background: '#fff',
        height: '130px'
    },
    titleStyle:{
        textAlign: 'left',
        fontStyle: 'italic',
        fontSize: '16px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '138px',
        marginLeft: '15px',
        verticalAlign: 'middle',
        display: 'block'
    }
}

export default styles;
