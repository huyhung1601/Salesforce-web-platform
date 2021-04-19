import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=>({
    root:{     
        padding: theme.spacing(1),
        height: '100%',
        '& .MuiListItemText-root' :{
            marginLeft: theme.spacing(1)            
        },
        '& .MuiFormControl-root':{            
        },
        '& .MuiListItem-root':{
            padding: theme.spacing(0.5),
            paddingRight: theme.spacing(2),
        },
        '& .MuiCardActions-root': {
            justifyContent: 'flex-end',
            paddingRight: theme.spacing(3),
        },

    },
    numInput:{
        width: '70px'
    },
    options: {
        minWidth: '100%'
    },
    cardContent:{
        height: '100%',
        minHeight: '500px',
        padding: theme.spacing(1),
    },
}))