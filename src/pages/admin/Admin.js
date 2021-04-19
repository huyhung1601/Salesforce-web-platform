import React from 'react'
import Header from '../../components/header/Header'
import useStyles from './styles'
import TabsBoard from '../../components/tabsBoard/TabsBoard'
import {GlobalProvider} from '../../context/product/GlobalState'
const Admin = () => {
    const classes= useStyles()
    return (
        <GlobalProvider>    
            <Header/>
            <TabsBoard/>
        </GlobalProvider>
    )
}

export default Admin
