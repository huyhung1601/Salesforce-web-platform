import React,{useContext, useState} from 'react'
import {IconButton, Badge, Menu, MenuItem, withStyles, Accordion, AccordionSummary,
     AccordionDetails, Checkbox, FormControlLabel, Typography} from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {GlobalContext} from '../../context/product/GlobalState'
const StyledMenu = withStyles({
    paper: {
    border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {        
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

const Mail = ({orders}) => {
    const {checkOrder} = useContext(GlobalContext)
    const unpaidOrders = orders.filter(x=>x.paid === false)
    const [anchorEl, setAnchorEl] =useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
        <IconButton color='inherit' onClick={handleClick} 
            aria-controls="customized-menu"
            aria-haspopup="true"
        >
            <Badge badgeContent={unpaidOrders.length} color='secondary'>
                <MailIcon/>
            </Badge>
        </IconButton>
        {unpaidOrders.length !==0 && 
            <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {unpaidOrders.map(x=>(
            
                <Accordion key ={x.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"                 
                    >
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Checkbox value={x.paid} onChange = {()=>checkOrder(x.id)} />}                        
                    /> 
                    <Typography style={{marginTop: 8}}>{`${x.customer} : $${x.total}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                        {x.items.map(item=>(
                           <div >
                               {`${item.name} : ${item.num}`}
                           </div> 
                        ))}
                    </AccordionDetails>
                </Accordion>
            
            ))}   
        </StyledMenu>}
        </>

    )
}

export default Mail
