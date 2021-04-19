import {Card, CardHeader, Container } from '@material-ui/core'
import React from 'react'
import {Line} from'react-chartjs-2'
const LineChart = () => {

    const data={
        labels:['Jan', 'Feb', 'Mar', 'Apr','May'],
        datasets:[
            {
               label:'Revenue' ,
               data:[12,19,3,5,2,3],
               borderColor: 'blue',
              
            },
            {
                label:'Expense' ,
                data:[11,13,23,12,2,3],
                borderColor: 'red',
               
             }
        ]
    }
    return (
        
            <Card>
                <Container>
                    <Line
                        data={data}
                        height={400} 
                        width={400}
                        options={{
                            title:{
                                display: true,
                                text: 'Income Statement',
                                fontSize:25,
                            },                            
                            responsive: true,
                            maintainAspectRatio: false,                              
                        }}
                    />
                </Container>
            </Card>
            
        
    )
}

export default LineChart
