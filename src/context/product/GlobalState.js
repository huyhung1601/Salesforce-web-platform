import React, { createContext, useReducer, useState } from 'react'
import {v4} from 'uuid'
import AppReducer from './AppReducer'

const initialState ={
    products :[
        {id: v4(),name: 'greentea', type:'tea', quantity: 50, price: 22, cost: 10},
        {id: v4(),name: 'blacktea', type:'tea', quantity: 100, price: 10, cost: 5},
        {id: v4(),name: 'honeyMGO30', type: 'honey', quantity: 20, price: 8, cost:4},
        {id: v4(),name: 'honeyMGO100', type: 'honey', quantity: 20, price: 15, cost:8},
        {id: v4(),name: 'honeyMGO300', type: 'honey', quantity: 20, price: 30, cost:15},
        {id: v4(),name: 'cocacola', type:'drink', quantity: 50, price: 2, cost: 1},
        {id: v4(),name: 'pepsi', type:'drink', quantity: 100, price: 2, cost: 1},
        ],   
    orders: [
        {id: v4(), date: new Date(), paid: false, total: 42, customer: 'client1',
            items: [                
                {id: v4(),name: 'greentea', type:'tea', num: 1, price: 22, cost: 10},
                {id: v4(),name: 'blacktea', type:'tea', num: 2, price: 10, cost: 5},
            ]},
        {id: v4(), date: new Date(), paid: false, total: 38,customer: 'client2',
            items: [
                {id: v4(),name: 'honeyMGO30', type: 'honey', num: 1, price: 8, cost:4},
                {id: v4(),name: 'honeyMGO100', type: 'honey', num: 2, price: 15, cost:8},
            ]},
        {id: v4(), date: new Date(), paid: true, total: 146,customer: 'client3',
            items: [
                {id: v4(),name: 'honeyMGO300', type: 'honey', num: 2, price: 30, cost:15},
                {id: v4(),name: 'honeyMGO30', type: 'honey', num: 2, price: 8, cost:4},
                {id: v4(),name: 'honeyMGO100', type: 'honey', num: 2, price: 15, cost:8},
                {id: v4(),name: 'pepsi', type:'drink', num: 20, price: 2, cost: 1},
            ]},
        
    ]
}
//Create Context

export const GlobalContext = createContext(initialState)

//Provider Compnent

export const GlobalProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
/**Action */
    //ADD_OR_EDIT_PRODUCT
    function addOrEditProduct (values) {    
        if (!values.id ) {
        const newProduct= {id:v4(), ...values}
            dispatch({
                type: 'ADD_PRODUCT',
                payload: newProduct,
            })  
        } else dispatch({
            type: 'EDIT_PRODUCT',
            payload: values
        })

    }
    //DELETE_PRODUCT 
    function deleteProduct (id) {        
        dispatch({
            type: 'DELETE_PRODUCT',
            payload: id
        })
    }

    //CHECK_ORDERS
    function checkOrder (id) {
        dispatch({
            type: 'CHECK_ORDERS',
            payload: id
        })
    }

    //ADD_ORDER
    function addNewOrder (newOrder){
        //axios call API
        const addNewOrder = {...newOrder, id: v4(), date: new Date() }
        dispatch({
            type: 'ADD_ORDER',
            payload: addNewOrder,
        })
    }
    //REFUND_ORDER
    function refundOrder (id) {
        dispatch({
            type: 'REFUND_ORDER',
            payload: id
        })
    }
    return(<GlobalContext.Provider value={{
        products: state.products,
        orders: state.orders,
        addOrEditProduct,        
        deleteProduct,
        checkOrder,
        addNewOrder,
        refundOrder,
    }}>   
        {children}
    </GlobalContext.Provider>  
    );
}