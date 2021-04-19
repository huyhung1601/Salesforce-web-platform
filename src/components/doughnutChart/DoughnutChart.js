import { Card, CardContent } from '@material-ui/core'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const DoughnutChart = ({doughnutData}) => {    
    const labels = doughnutData.map(x=>x.type)
    const num = doughnutData.map(x=>x.num)
    
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: num,
            backgroundColor: [ 'Green', 'Blue','Red', 'Orange', 'Yellow',],
          }
        ]
      };
    return (
        <Card style={{minHeight: '50%'}}>
            <CardContent>
                <Doughnut
                    data={data}
                    options={{
                        responsive:true,
                        title:{
                            display: true,
                            text: 'Sales',
                            fontSize:25,
                        },
                        legend:{
                            position: 'right'
                        }
                    }}
                />
            </CardContent>    
        </Card>
    )
}

export default DoughnutChart
