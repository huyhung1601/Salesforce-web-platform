import {Grid, Paper } from '@material-ui/core'
import {GlobalContext} from '../../context/product/GlobalState'
import React, { useContext } from 'react'
import useStyles from './styles'
import Salesboard from '../../components/salesboard/Salesboard'
import Menu from '../../components/saleMenu/Menu'
import {useForm} from '../../components/useForm'

const initialValues ={  
    paid: true,  
    items:[],   
    customer: '',
}
const Sales = () => {
    const {products} =  useContext(GlobalContext)    
    const {values, addItem,setNumChange,deleteItem,handleInputChange, resetForm} = useForm (initialValues)
    const classes= useStyles()

    return (
        <>
            <Grid container>
                <Grid item xs ={12} sm={6}>
                    <Salesboard products={products} addItem={(item)=>addItem(item)} 
                    values={values} setNumChange={(value,id)=>setNumChange(value,id)}
                    deleteItem={(id)=>deleteItem(id)} handleInputChange={handleInputChange} resetForm={resetForm}/>
                </Grid>
                <Grid item xs ={12} sm={6}>
                    <Menu products={products} addItem={(item)=>addItem(item)} />  
                </Grid>
            </Grid>

        </>


    )
}

export default Sales
