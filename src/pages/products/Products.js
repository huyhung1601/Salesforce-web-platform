import React, { useContext,useState } from 'react'
import useStyles from './styles'
import {GlobalContext} from '../../context/product/GlobalState'
import { Paper, Toolbar, InputAdornment,TableBody, TableCell, TableRow,} from '@material-ui/core'
import PageHeader from '../../components/pageHeader/PageHeader'
import {LocalGroceryStore, Add, Search, Delete, EditOutlined} from '@material-ui/icons';
import Controls from '../../components/controls/Controls'
import useTable from '../../components/useTable'
import Popup from '../../components/Popup'
import ProductForm from './productForm/ProductForm'
const headCells = [
    {id:'name', label:'Name'},
    {id:'type', label:'Type'},
    {id:'quantity', label:'Quantity'},
    {id:'price', label:'Price'},
    {id: 'cost', label: 'Cost', disableSorting: true},
    {id:'action', label: 'Action', disableSorting: true},
]

const Products = () => {
    const classes = useStyles()
    const {products,deleteProduct} = useContext(GlobalContext)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState()
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }
    // Extract useTable
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting} = useTable(products, headCells,filterFn);
    return (
        <>
            <PageHeader
                title='Products'
                subTitle='Add Products to Your Menu'
                icon={<LocalGroceryStore/>}
            />
            <Paper className={classes.pageContent}>
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
                        onClick={()=> {setOpenPopup(true);setRecordForEdit()}}
                    />
                </Toolbar>
                <TblContainer>
                <TblHead/>
                <TableBody>
                {
                    recordsAfterPagingAndSorting().map(item =>(
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{`$ ${item.price}`}</TableCell>
                            <TableCell>{`$ ${item.cost}`}</TableCell>
                            <TableCell>
                                <Controls.ActionButton 
                                    color='primary' 
                                    onClick={()=>{setRecordForEdit(item);setOpenPopup(true)}}
                                    fontSize='small'
                                >
                                    <EditOutlined/>
                                </Controls.ActionButton>
                                <Controls.ActionButton 
                                    color='secondary'
                                    onClick={()=>deleteProduct(item.id)}
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
            <Popup
                title="New Product"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ProductForm
                setOpenPopup={()=>setOpenPopup(false)}
                recordForEdit={recordForEdit}
                />
            </Popup>
        </>
    )
}

export default Products
