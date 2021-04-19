import { Paper, Toolbar, InputAdornment, TableBody, TableRow,TableCell, Checkbox } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import useStyles from './styles'
import PageHeader from '../../components/pageHeader/PageHeader'
import {GlobalContext} from '../../context/product/GlobalState'
import {Add, Search,Delete} from '@material-ui/icons'
import Controls from '../../components/controls/Controls'
import useTable from '../../components/useTable'

const headCells = [
    {id:'paid', label:'Paid'},
    {id:'customer', label:'Customer'},   
    {id:'date', label: 'Date'},      
    {id:'total', label:'Total'},    
    {id:'action', label: 'Action', disableSorting: true},
]
const Records = () => {
    const classes = useStyles()
    const {orders, checkOrder, refundOrder} = useContext(GlobalContext) 
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.customer.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    //Extract useTable
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting} = useTable(orders, headCells, filterFn);
    return (
        <>
            <PageHeader
            title='Records'
            subTitle='Order Storage'
            />
            <Paper>
                <Toolbar>
                    <Controls.Input
                        className={classes.searchInput}
                        label = 'Search Products'
                        InputProps= {{
                                startAdornment: (<InputAdornment position='start'>
                                    <Search/>
                                </InputAdornment>)
                            }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text = 'Add new'
                        variant = 'outlined'
                        startIcon = {<Add/>}
                        className={classes.newButton}
                        // onClick={()=> {setOpenPopup(true);setRecordForEdit()}}
                    />
                </Toolbar>
                <TblContainer>
                <TblHead/>
                <TableBody>
                {
                    recordsAfterPagingAndSorting().map(item =>(
                        <TableRow key={item.id}>
                            <TableCell>
                                {<Checkbox
                                    checked={item.paid}
                                    onChange={()=> checkOrder(item.id)}
                                />}
                            </TableCell>
                            <TableCell>{item.customer}</TableCell>                           
                            <TableCell>{item.date.toLocaleDateString([], {year: 'numeric', month:'long', day:'numeric'})}</TableCell>
                            <TableCell>{`$ ${item.total}`}</TableCell>
                            <TableCell>                                
                                <Controls.ActionButton 
                                    color='secondary'
                                    onClick={()=>refundOrder(item.id)}
                                >
                                    <Delete/>
                                </Controls.ActionButton>
                            </TableCell>
                        </TableRow>
                    ))            
                }
                </TableBody>
            </TblContainer>
            <TblPagination/>
           </Paper>
        </>
    )
}

export default Records
