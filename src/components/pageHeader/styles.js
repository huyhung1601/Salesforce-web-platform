import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=>({
    root:{
        backgroundColor: "#fdfdff"
    },
    pageHeader:{
        padding: theme.spacing(4),
        display:'flex',
        marginBottom: theme.spacing(2)
    },
    pageIcon:{
        display: 'inline-block',
        padding: theme.spacing(2),
        color: '#3c44b1'
    },
    pageTitle:{
        paddingLeft: theme.spacing(4), 
        '& .MuiTypography-subtitle2':{
            opacity: '1'
        }
    }
}))