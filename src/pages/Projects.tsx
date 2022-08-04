import {Box, Button, Card, Divider, Grid, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import AddProject from '../components/AddProject'
import ConfirmationModal from '../components/ConfirmationModal'
import AppLayout from '../components/Layout/AppLayout'
import LinearProgressBar from '../components/LinearProgressBar'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {deleteProject, projects} from '../redux/slices/ProjectsSlice'

type Props = {}

const Projects = (props: Props) =>
{
    const {project} = useAppSelector(projects);
    const navigate = useNavigate();
    const [openProjectAdditionModal, setOpenProjectAdditionModal] = useState<boolean>(false)
    const [confirmation, setConfirmation] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const dispatch = useAppDispatch();
    console.log(project)

    return (
        <AppLayout title='Projects'>
            <AddProject open={openProjectAdditionModal} setOpen={setOpenProjectAdditionModal} />
            <ConfirmationModal message={message} open={confirmation} setOpen={setConfirmation} />
            <Grid container justifyContent="flex-end" sx={{marginTop: "1rem", padding: "1rem", width: "100%", }}>
                <Grid item><Button variant="contained" color="secondary" onClick={() => {setOpenProjectAdditionModal(true)}}>Add Project</Button></Grid>
            </Grid>
            <Grid container>

                {project.map((info, index) =>
                {
                    const {tasks, projectTitle, projectId} = info
                    return (
                        <Grid key={index} item sx={{marginTop: "1rem", width: "100%", }} xs={12} sm={6} md={4}>
                            <Grid container spacing={1} justifyContent="center" direction="row" sx={{padding: "1rem"}}>
                                <Card sx={{padding: "1rem", borderRadius: "1rem", width: "100%"}}>
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

                                        const {taskId} = items
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
                                    <Grid container sx={{marginTop: "1rem"}} justifyContent="center">
                                        {tasks.length === 0 ? <>    <Typography>There are no tasks available</Typography></> : null}
                                    </Grid>
                                    <Box sx={{width: '100%'}}>
                                        {tasks.length === 0 ? <> <LinearProgressBar value={0} /></> : null}
                                    </Box>
                                    <Divider sx={{marginTop: "1rem", marginBottom: "1rem"}} />
                                    <Grid container spacing={2} justifyContent="flex-end">
                                        <Grid item>  <Button variant="outlined" color="error" sx={{borderRadius: "1rem"}} onClick={() =>
                                        {
                                            dispatch(deleteProject(projectId));
                                            setMessage(`${projectTitle} has been deleted successfully`)
                                            setConfirmation(true)
                                        }}> Delete Project</Button></Grid>
                                        <Grid item>  <Button variant="contained" sx={{borderRadius: "1rem", backgroundColor: "purple"}} onClick={() => {navigate(`/projects/${projectId}`)}}>{tasks.length === 0 ? "Add Tasks" : "View Tasks"}</Button></Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    )
                })}




            </Grid>
        </AppLayout>
    )
}

export default Projects