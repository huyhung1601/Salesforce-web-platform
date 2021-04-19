import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, Typography,Box} from '@material-ui/core'
import useStyles from './styles'
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Products from '../../pages/products/Products';
import Dashboard from '../../pages/dashboard/Dashboard'
import Sales from '../../pages/sales/Sales'
import Staffs from '../../pages/staffs/Staffs'
import Records from '../../pages/records/Records';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function TabsBoard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Tabs            
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >
            <Tab label="Dashboard" icon={<DashboardIcon/>} {...a11yProps(0)} />
            <Tab label="Sales" icon={<LocalMallIcon/>} {...a11yProps(1)} />
            <Tab label="Products" icon={<LocalGroceryStoreIcon/>} {...a11yProps(2)} />
            <Tab label="Staffs" icon={<PermContactCalendarIcon/>} {...a11yProps(3)} />
            <Tab label="Records" icon={<MenuBookIcon/>} {...a11yProps(4)} />            
        </Tabs>
        <TabPanel value={value} index={0}>
            <Dashboard/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Sales/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Products/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <Staffs/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <Records/>
        </TabPanel>
    </div>
  );
}