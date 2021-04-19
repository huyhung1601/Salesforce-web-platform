import { AppBar, Grid, Toolbar, IconButton, Badge } from '@material-ui/core'
import React, { useContext } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail'
import useStyles from './styles'
import {GlobalContext} from '../../context/product/GlobalState'
import Mail from '../mail/Mail';
const Header = () => {
    const classes= useStyles()
    const {orders} = useContext(GlobalContext)
    
    
    return (
        <AppBar position='static'>
            <Toolbar>
                <Grid container>
                    <Grid item>Logo</Grid>
                    <Grid item xs/>
                    <Grid>
                        <Mail orders={orders}/>
                        <IconButton color='inherit'>
                            <Badge badgeContent={3} color='secondary'>
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton color='inherit'>
                            <AccountCircleIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
