import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme)=>({
    root: {
        padding: theme.spacing(1),
        
    },
    menu:{
       display: 'flex',
       flexWrap: 'wrap', 
       height: '100%'
    },
    cardContent:{
        minHeight: '473px'
    }
}))