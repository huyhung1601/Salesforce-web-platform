import {makeStyles} from '@material-ui/core/styles'

export default makeStyles ((theme)=>({
    root:{
        marginLeft: theme.spacing(0),
        ' .MuiCardContent-root':{
           
        },
        '& .MuiFormControl-root':{
            minWidth: '70%',  
            padding: theme.spacing(0.5),
            marginTop: theme.spacing(1)
        },
    },
    container: {
        display: 'flex',        
        justifyContent: 'center',
    }
}))