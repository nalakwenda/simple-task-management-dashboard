import {Box, Button, Card, Chip, Divider, Grid, LinearProgress, LinearProgressProps, Paper, Typography} from '@mui/material'
import Chart from "react-apexcharts";
import {format, formatDistance, formatRelative, addDays} from 'date-fns'
import {es, ru} from 'date-fns/locale'
import LinearProgressBar from '../components/LinearProgressBar'
import AppLayout from '../components/Layout/AppLayout'
import {data} from '../data/data'
import ReactApexChart from 'react-apexcharts';
import {useAppSelector} from '../redux/hooks';
import {userDetails} from '../redux/slices/AuthSlice';
import {projects} from '../redux/slices/ProjectsSlice';

type Props = {}



const Dashboard = (props: Props) =>
{

    const {firstName} = useAppSelector(userDetails);
    const {project} = useAppSelector(projects);

    const filteredTasks = project.map((project) =>
    {
        const newTasksObject: any[] = []
        const newArrayOfTasks = newTasksObject.concat.apply([], project.tasks);
        return newTasksObject.concat.apply([], project.tasks)
    }).reduce((previousValue, currentValue) =>
    {
        return previousValue.concat(currentValue)
    }, []);


    const completedTasks = filteredTasks.filter((f: any) =>
    {
        return f.status === "Completed"
    })

    return (
        <AppLayout title="Dashboard">
            <Grid container direction="row">
                <Grid item xs={12}
                    sx={{
                        padding: "0.5rem"
                    }}
                >
                    <Paper sx={{
                        padding: "2rem",
                        borderRadius: "0.5rem"
                    }}>
                        <Grid>
                            <Typography variant="h4">Hello {firstName}!</Typography>
                        </Grid>
                        <Grid sx={{
                            padding: "0.5rem"
                        }}>
                            <Typography variant="body1">Check your Tasks and Schedules</Typography>
                        </Grid>

                    </Paper >
                </Grid>

            </Grid>
            <Grid container direction="row" spacing={1} sx={{padding: "0.5rem", marginTop: "1rem"}}>
                {data.slice(0, 3).map((project, index) =>
                {
                    const {projectId, projectTitle, tasks} = project
                    return (
                        <Grid item  key={index} xs={12} sm={12} md={4} lg={4} sx={{}}>
                            <Card sx={{padding: "1rem", borderRadius: "1rem"}}>
                                <Grid container justifyContent="center">
                                    <Typography variant='h5'>
                                        {projectTitle}
                                    </Typography>
                                </Grid>

                                {tasks.slice(0, 1).map((items, index) =>
                                {

                                    const completedTasks = tasks.filter((complete) =>
                                    {
                                        const {status} = complete
                                        return status === "Completed"
                                    })
                                    const percentageOfCompletedTasks = (completedTasks.length / tasks.length) * 100
                                    return (
                                        <Grid key={index} sx={{marginTop: "1rem"}}>
                                            <Grid container justifyContent="center">
                                                <Typography>{completedTasks.length}/{tasks.length}  have been completed</Typography>
                                            </Grid>

                                            <Box sx={{width: '100%'}}>
                                                <LinearProgressBar value={percentageOfCompletedTasks} />
                                            </Box>



                                        </Grid>
                                    )
                                })}

                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid container spacing={1} sx={{marginTop: "1rem"}}>
                <Grid item xs={12} md={8} >
                    <Card sx={{borderRadius: "2rem", padding: "1rem"}}>
                        <Grid direction="column" container>
                            <Grid item justifyContent="center" >
                                <Typography variant="h5">Pending Tasks</Typography>
                            </Grid>
                            <Grid item spacing={1} sx={{marginBottom: "1rem"}}>
                                {filteredTasks.slice(0, 4).map((info, index) =>
                                {
                                    const {taskTitle, end} = info
                                    return (
                                        <Grid container direction="column" key={index} sx={{padding: "0.2rem", marginTop: "0.5rem", }} >
                                            <Grid item sx={{}}>
                                                <Typography component="p">{taskTitle}</Typography>
                                            </Grid>
                                            <Grid item sx={{marginTop: "0.5rem"}}>
                                                <Chip label={`Due date: ${end.replace(/\\"/g, '"')}`} />
                                                {/* <Typography paragraph>Due date: {end}</Typography> */}
                                            </Grid>

                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{borderRadius: "2rem"}}>
                        <ReactApexChart
                            options={{

                                plotOptions: {
                                    radialBar: {
                                        startAngle: -135,
                                        endAngle: 225,
                                        hollow: {
                                            margin: 0,
                                            size: '70%',
                                            background: '#fff',
                                            image: undefined,
                                            imageOffsetX: 0,
                                            imageOffsetY: 0,
                                            position: 'front',
                                            dropShadow: {
                                                enabled: true,
                                                top: 3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.24
                                            }
                                        },
                                        track: {
                                            background: '#fff',
                                            strokeWidth: '67%',
                                            margin: 0, // margin is in pixels
                                            dropShadow: {
                                                enabled: true,
                                                top: -3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.35
                                            }
                                        },

                                        dataLabels: {
                                            show: true,
                                            name: {
                                                offsetY: -10,
                                                show: true,
                                                color: '#888',
                                                fontSize: '17px'
                                            },
                                            value: {

                                                color: '#111',
                                                fontSize: '36px',
                                                show: true,
                                            }
                                        }
                                    }
                                },
                                fill: {
                                    type: 'gradient',
                                    gradient: {
                                        shade: 'dark',
                                        type: 'horizontal',
                                        shadeIntensity: 0.5,
                                        gradientToColors: ['#ABE5A1'],
                                        inverseColors: true,
                                        opacityFrom: 1,
                                        opacityTo: 1,
                                        stops: [0, 100]
                                    }
                                },
                                stroke: {
                                    lineCap: 'round'
                                },
                                labels: ['Completed Tasks'],
                            }}
                            series={[(completedTasks.length / filteredTasks.length) * 100]}
                            type="radialBar"
                            height={350} />
                    </Card>
                </Grid>
            </Grid>
        </AppLayout>

    )
}

export default Dashboard