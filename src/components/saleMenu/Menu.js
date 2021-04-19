import { Box, Card, CardContent, CardHeader, Container, Grid,} from '@material-ui/core'
import React, { useContext, useState } from 'react'
import Button from '../controls/Button'
import useStyles from './styles'

const Menu = ({products,addItem}) => {
    const [menu, setMenu] = useState(products)
    const classes = useStyles()
    const types= [...new Set(products.map(x=>x.type))]
    
    const filterMenu = (title) =>{
        const newMenu = products.filter(x=>x.type === title)
        setMenu(newMenu)
    }
    return (
        <Container className={classes.root}>
        <Card >
            <CardHeader
                title='Menu'
            />
            <CardContent className={classes.cardContent}>
            <Grid container direction='row'>
                <Grid item xs={3}>
                    <Card>
                    <Box>
                        <Button text='All'onClick={()=>setMenu(products)}/>
                    </Box>
                    {types.map(x=>(
                        <Box>
                            <Button text={x} onClick={()=>filterMenu(x)}/>
                        </Box>
                    ))}
                    </Card>
                </Grid>                
                <Grid item xs={9}>
                    <Card className={classes.menu}>
                       {menu.map(x=>(
                           <Box>
                               <Button text={x.name} onClick={()=>addItem(x)}/>
                           </Box>
                       ))}
                    </Card>  
                </Grid>
            </Grid>
            </CardContent>
        </Card>
        </Container>
    )
}

export default Menu
