import { Card, CardContent, CardHeader, Grid,Typography,IconButton } from '@material-ui/core'
import React, { useContext, useEffect,useState } from 'react'
import useStyles from './styles'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PeopleIcon from '@material-ui/icons/People';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LineChart from '../../components/lineChart/LineChart';
import DoughnutChart from '../../components/doughnutChart/DoughnutChart';
import {GlobalContext} from '../../context/product/GlobalState'
import Controls from '../../components/controls/Controls';
import {useForm} from '../../components/useForm'
import TopSelling from '../../components/topSelling/TopSelling';

const initialValues ={
    date: new Date(),
} 

const Dashboard = () => {    
    // const [data, setData] = useState([])
    const classes = useStyles()
    const {orders} = useContext(GlobalContext)
    const {values, handleInputChange} = useForm(initialValues)
    const revenue = orders.map(x=>x.total).reduce((a,b)=>a+b,0)    
    const cost = orders.map(x=>x.items).flat().map(item=>item.cost*item.num).reduce((a,b)=>a+b,0)   
    const doughnutData = Array.from(orders.map(x=>x.items).flat().reduce(
        (m, {type, num}) => m.set(type, (m.get(type) || 0) + num), new Map
      ), ([type, num]) => ({type, num}));
      console.log(doughnutData); 

    return (
        <>
            <div className={classes.header}>
                <Typography variant='h5'>Wellcome to Business's Name</Typography>
                <Controls.DatePicker 
                    name='date'
                    value={values.date}
                    onChange={handleInputChange}
                />
            </div>
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs ={3} className={classes.cardItem}>
                    <Card >
                        <CardHeader
                            avatar={
                                <AccountBalanceIcon/>
                            }
                            title='Income Statement'
                            subheader={values.date.toLocaleDateString([], {year: 'numeric', month:'long', day:'numeric'})}
                        />
                        <CardContent>
                            <Typography>{`Revenue : $${revenue}`}</Typography>
                            <Typography>{`Cost: $${cost}`}</Typography>
                            <Typography>{`Profit: $${revenue - cost}`}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid  item xs ={3} className={classes.cardItem}>
                    <Card >
                        <CardHeader
                            avatar={
                                <PeopleIcon/>
                            }
                            title='Staffs'
                            subheader='100 members'
                        />
                        <CardContent>
                            <Typography>Salary : $599</Typography>
                            <Typography>Subsidize: $34</Typography>
                            <Typography>Total: $78</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid  item xs ={3} className={classes.cardItem}>
                    <Card >
                        <CardHeader
                            avatar={
                                <BookmarksIcon/>
                            }
                            title='Orders'
                            subheader='Today'
                        />
                        <CardContent>
                            <Typography>{`Total : ${orders.length}`}</Typography>
                            <Typography>{`Paid : ${orders.filter(x=>x.paid ===true).length}`}</Typography>
                            <Typography>{`UnPaid : ${orders.filter(x=>x.paid ===false).length}`}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid  item xs ={3} className={classes.cardItem}>
                    <Card >
                        <CardHeader
                            avatar={
                                <ReceiptIcon/>
                            }
                            title='Expense'
                            subheader='monthly'
                        />
                        <CardContent>
                            <Typography>Rent : $1500</Typography>
                            <Typography>Utility Bill : $195</Typography>
                            <Typography>Total: $1695</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    <LineChart/>
                </Grid>
                <Grid item xs={12} sm={4} >
                    <DoughnutChart doughnutData={doughnutData}/>  
                    <TopSelling/>             
                </Grid>                  
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard
