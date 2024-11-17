
import { Box, Card, CardContent, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

export default function AnalaticsChart() {

    const chartOptions: unknown = {
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        options: {
            responsive: [
                {
                    breakpoint: 1024,
                    options: {
                        chart: {
                            height: 300,
                        },
                    },
                },
                {
                    breakpoint: 1366,
                    options: {
                        chart: {
                            height: 350,
                        },
                    },
                },
            ],
            chart: {
                type: 'bar',
                width: '100%',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val: unknown) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        }
    };



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = (chartOptions as { options: any }).options;
    const series = (chartOptions as { series: ApexAxisChartSeries | ApexNonAxisChartSeries }).series;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
            <Card sx={{ width: '50%' }}>
                <CardContent>
                    <Typography variant='h6' sx={{ mx: 4 }}>Analicits</Typography>
                    <ReactApexChart options={options} series={series} type="bar" height={350} />
                </CardContent>
            </Card>
            <Card sx={{ width: '50%' }}>
                <CardContent>
                    <Typography variant='h6' sx={{ mx: 4 }}>Analicits</Typography>
                    <ReactApexChart options={options} series={series} type="bar" height={350} />
                </CardContent>
            </Card>
        </Box>
    )
}
