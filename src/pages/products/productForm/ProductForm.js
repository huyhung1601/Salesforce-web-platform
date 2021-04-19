import React, { useContext, useEffect } from 'react'
import useStyles from './styles'
import Controls from '../../../components/controls/Controls'
import { Grid } from '@material-ui/core'
import {useForm} from '../../../components/useForm'
import {GlobalContext} from '../../../context/product/GlobalState'
import { ErrorSharp } from '@material-ui/icons'

const initialValues={    
    name: '',
    type: '',
    quantity: 0,
    price: 0,
    cost: 0,
}
const ProductForm = ({setOpenPopup, recordForEdit}) => {
    const classes = useStyles()    
    const {addOrEditProduct} = useContext(GlobalContext)

    /**Validate */
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required." 
        if ('type' in fieldValues)
            temp.type = fieldValues.type ? "" : "This field is required."  
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity !== 0? "" : "This field is required."  
        if ('price' in fieldValues)
            temp.price = fieldValues.price !== 0 ? "" : "This field is required."
        if ('cost' in fieldValues)
            temp.cost = fieldValues.cost !== 0 ? "" : "This field is required."        
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {values, setValues, resetForm, handleInputChange, errors, setErrors} = useForm(initialValues, true, validate )
    /**Add Product */
    const handleSubmit = e =>{
        e.preventDefault()
        if (validate()){
            addOrEditProduct(values)
        setOpenPopup()
    }}
    
    useEffect(()=>{
        if (recordForEdit != null)
        setValues({
            ...recordForEdit
        })
    },[recordForEdit])
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid container className={classes.container}>
                <Grid item xs={6}>
                    <Controls.Input
                        name='name'
                        label='Name'
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name='type'
                        label='Type'
                        value={values.type}
                        onChange={handleInputChange}
                        error={errors.type}
                    />
                    <Controls.Input
                        name='quantity'
                        label='Quanrity'
                        type='number'
                        value={values.quantity}
                        onChange={handleInputChange}
                        error={errors.quantity}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name='price'
                        label='Price'
                        type='number'
                        value={values.price}
                        onChange={handleInputChange}
                        error={errors.price}
                    />
                    <Controls.Input
                        name='cost'
                        label='Cost'
                        type='number'
                        value={values.cost}
                        onChange={handleInputChange}
                        error={errors.cost}
                     />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>            
            
        </form>
    )
}

export default ProductForm
