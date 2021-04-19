import React, { useState, useEffect, useContext } from 'react'
import {TextField, ButtonBase, List, ListItem, ListItemText,IconButton,
    Typography, ListItemIcon, CardContent,Card, CardActions,Divider} from '@material-ui/core'
import {Delete} from '@material-ui/icons/'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Controls from '../controls/Controls'
import useStyles from './styles'
import {GlobalContext} from '../../context/product/GlobalState'


const Salesboard = ({products,addItem,values,setNumChange,deleteItem,handleInputChange,resetForm}) => {
    const {addNewOrder} = useContext(GlobalContext)
    const classes = useStyles()
    const [total,setTotal] = useState()      
    useEffect(() => {
        const updateTotal = values.items.map(x=>x.num*x.price).reduce((a,b)=> a+b,0)
        setTotal(updateTotal)
    }, [values])
    
    const handleSubmit = e =>{
        e.preventDefault()    
        const newOrder={...values,total}    
        addNewOrder(newOrder)
        resetForm()
    }
    
    return (
        <form className={classes.root} onSubmit={handleSubmit}>    
            <Card>
                <CardContent className={classes.cardContent}>
                    <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={products}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option ) => (
                        <React.Fragment>
                            <ButtonBase onClick={()=>addItem(option)} className={classes.options}>
                                {option.name}
                            </ButtonBase>
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Add Products" margin="normal" variant="outlined" />
                    )}
                />   
                    <List>
                        {values.items.map(x=>(
                            <ListItem key={x.id} >
                                <ListItemIcon >
                                    <IconButton onClick={()=>deleteItem(x.id)}>
                                        <Delete/>
                                    </IconButton>
                                </ListItemIcon>
                                <Controls.Input
                                    className={classes.numInput}
                                    type='number'
                                    value={x.num}
                                    onChange = {(e)=>setNumChange(e.target.value,x.id)}
                                />
                                <ListItemText primary={x.name} secondary={`Max ${x.quantity}`}/>
                                
                                <Typography>${`${x.price*x.num}`}</Typography>                                               
                            </ListItem>
                            
                        )) }
                    </List>  
                </CardContent>
                <Divider/>
                <CardActions >
                    <Controls.Input
                        name='customer'
                        label='Customer'
                        value={values.customer}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name='paid'
                        label='Paid'
                        value= {values.paid}
                        onChange= {handleInputChange}
                    />
                    { total !==0 && <Controls.Button type='submit' text='Save' style={{marginRight: '15px'}} />}
                    { total === 0 && <Controls.Button text='Save' style={{marginRight: '15px'}} disabled= 'false'/>}
                    <Typography style={{ minWidth: '50px'}}>$ {total}</Typography>                                     
                </CardActions>
            </Card>          
        </form>
        
    )
}

export default Salesboard
