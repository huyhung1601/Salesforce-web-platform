import React, {useState} from 'react'

export const useForm = (initialValues,validateOnChange = false, validate) => {

    const [ values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    /**handle InputChange */
    const handleInputChange = (e) =>{
        const {name,value} = e.target
        const newData= {...values, [name]: value}
        setValues(newData)
        if(validateOnChange)
        validate({[name] : value})
    }
    /**Add Item */
    const addItem = (item) =>{
        const {items} = values
        const itemSold = {...item, num: 1}
        const sum = itemSold.price*itemSold.num
        if (items === []) {            
            setValues({
                ...values,
                items : [...items,itemSold]
            })
        } else if (items.every(x=>x.id !== item.id)) {
            setValues({
                ...values,                
                items : [...items,itemSold]
            })
        } else {            
            setValues({
                ...values,                
                items: items.map(x=>x.id ===item.id?{...x, num: x.num + 1}:x)
            })
        } 
        }
    /**setNumChange */

        const setNumChange= (value,id) =>{
            const {items} = values
            setValues({
                ...values,
                items: items.map(x => x.id ===id?{...x, num: value}:x)
            })
        }
    /**Delete Item */
    const deleteItem = (id) =>{
        const {items} = values
        setValues({
            ...values,
            items: items.filter(x=>x.id!==id)
        })

    }
    /**Reset Form */
    const resetForm = () =>{
        setValues(initialValues);
        setErrors({})
    }
    
    return {
        values,
        handleInputChange,
        errors,
        setErrors,
        resetForm,
        setValues,    
        addItem,
        setNumChange,
        deleteItem,
    }
}