import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme)=>({
    dialogWrapper:{
        padding: theme.spacing(0.5),
        position: 'absolute',
        top: theme.spacing(3)
    }
}))

const IconDialog = (props) => {

    const classes = useStyles();    

    const {title, children, openIconDialog, handleClose,} = props
    
    
    return (

        <Dialog onCLose ={handleClose} open={openIconDialog} maxWidth='sm'classes={{paper:classes.dialogWrapper}}>
            <DialogTitle>
                <div style={{display: 'flex'}}>
                <Typography variant='h6' component='div' style={{flexGrow: 1}}>
                    {title}
                </Typography>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default IconDialog