import { deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    appBar:{
        borderRadius: 15,
        margin: '2px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef'
    },
    heading:{
        color: '#55133B',
        textTransform: 'uppercase' 
    },
    image:{
        marginLeft: '15px'
    },
    toolbar:{
        display:'flex',
        justifyContent:'flex-end',
        width:'400px'
    },
    profile:{
        display:'flex',
        justifyContent:'space-between',
        width:'400px'
    },
    userName:{
        display:'flex',
        alignItems:'center'
    },
    brandContainer:{
        display:'flex',
        alignItems:'center'
    },
    purple:{
        color:theme.palette.getContrastText(deepPurple[500]),
        backgroundColor:deepPurple[500]
    }
}
))