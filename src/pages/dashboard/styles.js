import {makeStyles} from  '@material-ui/core/styles'

export default makeStyles ((theme)=>({
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiCardHeader-root':{
            padding: theme.spacing(1)
        },
        '& .MuiCardContent-root':{
            padding: theme.spacing(1),
        },
    },
    cardItem:{
        minWidth: 150 
    },
    header:{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
    }
}))