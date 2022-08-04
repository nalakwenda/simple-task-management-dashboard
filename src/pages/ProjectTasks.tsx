import {Button, Card, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, TextFieldProps, Typography} from '@mui/material';
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {Field, Form, Formik, useFormik} from 'formik';
import {object, string} from "yup";
import React, {useState} from 'react'
import {useParams} from 'react-router-dom';
import AppLayout from '../components/Layout/AppLayout';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {projects, addTask, updateTask, deleteTask, updateProjectTitle} from '../redux/slices/ProjectsSlice';
import {ProjectI, ProjectIdsI, TaskAndProjectIdsI, TasksI} from '../types/Project';
import {v4 as uuidv4} from 'uuid';
import AddTask from '../components/AddTask';
import ConfirmationModal from '../components/ConfirmationModal';


type Props = {}
type ProjectParams = {
    projectId: string

}

const ProjectTasks = (props: Props) =>
{
    const {projectId} = useParams<ProjectParams>();
    const {project} = useAppSelector(projects);
    const [editProject, setEditProject] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<boolean>(false);
    const [openProjectAdditionModal, setOpenProjectAdditionModal] = useState<boolean>(false)
    const [confirmation, setConfirmation] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    console.log(projectId,"ProjectId")

    const [task, setTask] = useState<TasksI>({
        taskId: uuidv4(),
        taskTitle: "",
        taskDescription: "",
        status: "In Progress",
        start: JSON.stringify(new Date()),
        end: JSON.stringify(new Date()),
    });
    const dispatch = useAppDispatch();


    if (projectId) {

        const selectedProject = project.filter(projects =>
            projects.projectId === projectId
        )

        const TaskToEdit = () =>
        {


            return (
                <Grid sx={{marginTop: "2rem"}} >
                    <ConfirmationModal message={message} open={confirmation} setOpen={setConfirmation} />
                    <Card sx={{padding: "2rem"}} >
                        <Formik
                            initialValues={{
                                taskId: task?.taskId,
                                taskTitle: task?.taskTitle,
                                taskDescription: task?.taskDescription,
                                status: task?.status,
                                start: task?.start,
                                end: task?.end,
                            }}
                            validationSchema={object({
                                taskTitle: string()
                                    .required("Please enter valid task title")
                                    .min(4, "Password should be minimum 4 characters long"),
                                taskDescription: string()
                                    .required("Please enter valid task description")
                                    .min(4, "Description should be minimum 4 characters long"),
                            })}
                            onSubmit={(values, formikHelpers) =>
                            {
                                const updateValues: TaskAndProjectIdsI = {
                                    projectId: projectId,
                                    taskId: values.taskId,
                                    task: values

                                }
                                console.log(values)

                                dispatch(updateTask(updateValues))
                                setConfirmation(true);
                                setMessage(`${task.taskTitle} has been updated!`)
                                setEditTask(false)

                                // formikHelpers.resetForm();

                            }}
                        >
                            {({errors, isValid, touched, dirty, values, setFieldValue}) => (
                                <Form>
                                    <Grid container direction="column" justifyContent="center" alignItems="center">
                                        <Grid>
                                            <Typography variant="h5">Edit Task</Typography>
                                        </Grid>
                                        <Grid item>
                                            < Field
                                                label="Task Title"
                                                placeholder="Refactor Code"
                                                as={TextField}
                                                name='taskTitle'
                                                fullWidth
                                                margin="normal"
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                sx={{width: "50rem"}}
                                                error={Boolean(errors.taskTitle) && Boolean(touched.taskTitle)}
                                                helperText={Boolean(touched.taskTitle) && errors.taskTitle}

                                            />
                                        </Grid>
                                        <Grid item >
                                            < Field
                                                label="Task Description"
                                                placeholder="Refactor Code"
                                                as={TextField}
                                                name='taskDescription'
                                                fullWidth
                                                margin="normal"
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                multiline={true}
                                                rows={6}
                                                sx={{width: "50rem"}}
                                                error={Boolean(errors.taskDescription) && Boolean(touched.taskDescription)}
                                                helperText={Boolean(touched.taskDescription) && errors.taskDescription}

                                            />
                                        </Grid>
                                        <Grid item >
                                            < Field
                                                label="Status"
                                                as={TextField}
                                                name='status'
                                                fullWidth
                                                margin="normal"
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                select
                                                sx={{width: "50rem"}}
                                                error={Boolean(errors.status) && Boolean(touched.status)}
                                                helperText={Boolean(touched.status) && errors.status}
                                            >
                                                <MenuItem key={"Completed"} value={"Completed"}>
                                                    Completed
                                                </MenuItem>
                                                <MenuItem key={"In Progress"} value={"In Progress"}>
                                                    In Progress
                                                </MenuItem>

                                            </Field>
                                        </Grid>
                                        <Grid item sx={{marginTop: "1rem"}}>
                                            <Grid container justifyContent="space-between" spacing={4} >
                                                <Grid item>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DateTimePicker
                                                            label="Start"
                                                            value={values.start}
                                                            onChange={(value) =>
                                                            {
                                                                setFieldValue('start', value);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} sx={{width: "24rem"}} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DateTimePicker
                                                            label="End"
                                                            value={values.end}
                                                            onChange={(value) =>
                                                            {
                                                                setFieldValue('end', value);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} sx={{width: "24rem"}} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sx={{marginTop: "3rem"}}>
                                            <Grid container spacing={4}>
                                                <Grid item sx={{width: "26rem"}}>
                                                    <Button variant="contained" color="secondary" disabled={!isValid || !dirty} type='submit' sx={{width: "100%"}} onClick={() =>
                                                    {

                                                    }}
                                                    >
                                                        Save
                                                    </Button>
                                                </Grid>
                                                <Grid item sx={{width: "26rem"}}>
                                                    <Button variant="outlined" color="error" sx={{width: "100%"}} onClick={() => {setEditTask(false)}}>Cancel</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Card >
                </Grid>
            )
        }
        return (
            <div>
                <AppLayout title="Project">
                    <AddTask open={openProjectAdditionModal} setOpen={setOpenProjectAdditionModal} projectId={projectId} />
                    <Grid>
                        {selectedProject !== undefined ? <>{selectedProject.map((info, index) =>
                        {
                            const {projectTitle, tasks} = info
                            return (
                                <Grid key={index}>
                                    <Grid container direction="row" sx={{width: "100%"}}>
                                        <Card sx={{padding: "2rem", width: "100%"}}>
                                            {editProject ?
                                                <Grid container direction="row" justifyContent="space-between" sx={{width: "100%"}}>

                                                    <Grid item sx={{width: "100%"}}>
                                                        <Formik
                                                            initialValues={{
                                                                projectId: projectId,
                                                                projectTitle: projectTitle
                                                            }}
                                                            validationSchema={object({
                                                                projectTitle: string()
                                                                    .required("Please enter valid project title"),

                                                            })}
                                                            onSubmit={(values, formikHelpers) =>
                                                            {
                                                                const updateValues: ProjectIdsI = {
                                                                    projectId: projectId,
                                                                    projectTitle: values.projectTitle

                                                                }
                                                                console.log(values)

                                                                dispatch(updateProjectTitle(updateValues))
                                                                setConfirmation(true);
                                                                setMessage(`${values.projectTitle} has been updated!`)
                                                                setEditProject(false)

                                                                // formikHelpers.resetForm();

                                                            }}
                                                        >
                                                            {({errors, isValid, touched, dirty, values, }) => (
                                                                <Form>
                                                                    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{width: "100%", }}>

                                                                        <Grid item sx={{width: "50%"}}>
                                                                            < Field
                                                                                label="Task Title"
                                                                                as={TextField}
                                                                                name='projectTitle'
                                                                                fullWidth
                                                                                margin="normal"
                                                                                type="text"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                sx={{}}
                                                                                error={Boolean(errors.projectTitle) && Boolean(touched.projectTitle)}
                                                                                helperText={Boolean(touched.projectTitle) && errors.projectTitle}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Grid container spacing={2} direction="row">

                                                                                <Grid item>
                                                                                    <Button type="submit" variant="contained" color="secondary" disabled={!isValid || !dirty} onClick={() => {setEditProject(true)}}>Save</Button>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <Button variant="outlined" color="error" onClick={() => {setEditProject(false)}}>  Cancel</Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Form>
                                                            )}
                                                        </Formik>
                                                    </Grid>


                                                </Grid>
                                                :
                                                <Grid container direction="row" justifyContent="space-between">
                                                    <Grid item><Typography variant='h5'>{projectTitle}</Typography></Grid>
                                                    <Grid item>
                                                        <Grid container direction="row" spacing={1}>
                                                            <Grid item>
                                                                <Button variant="contained" color="info" onClick={() => {setOpenProjectAdditionModal(true)}}>Add New Task</Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button variant="contained" color="secondary" onClick={() => {setEditProject(true)}}>Edit Project</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>}
                                        </Card>
                                    </Grid>

                                    {editTask ?
                                        <>
                                            <TaskToEdit />
                                        </>
                                        : <><Grid sx={{marginTop: "1rem"}} container >
                                            {tasks.map((task, index) =>
                                            {
                                                const {taskDescription, taskTitle, taskId} = task

                                                const ids: TaskAndProjectIdsI = {
                                                    projectId: projectId,
                                                    taskId: taskId

                                                }

                                                return (
                                                    <Grid item key={index} sx={{padding: "0.5rem", marginTop: "1rem"}} sm={6} md={6} lg={6}>
                                                        <ConfirmationModal message={message} open={confirmation} setOpen={setConfirmation} />
                                                        <Card sx={{padding: "1rem"}}>
                                                            <Grid container direction="column" >
                                                                <Grid item sx={{marginTop: "1rem"}}> <Typography variant="h6">{taskTitle}</Typography></Grid>
                                                                <Grid item >
                                                                    <Typography>{taskDescription}</Typography>
                                                                </Grid>
                                                                <Divider sx={{borderWidth: 2, width: "100%", marginTop: "1rem"}} />
                                                                <Grid container spacing={3} justifyContent="flex-end" direction="row" sx={{marginTop: "0.5rem"}}>
                                                                    <Grid item><Button variant='contained' color="secondary" onClick={() =>
                                                                    {
                                                                        setTask(task); setEditTask(true)
                                                                    }}>
                                                                        Edit
                                                                    </Button>
                                                                    </Grid>
                                                                    <Grid item ><Button variant='outlined' color="error" onClick={() =>
                                                                    {
                                                                        setMessage(`${taskTitle} has been deleted sucessfully.`);
                                                                        dispatch(deleteTask(ids))
                                                                        setConfirmation(true)
                                                                    }
                                                                    }>Delete</Button></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Card>
                                                    </Grid>
                                                )
                                            })}

                                        </Grid></>}


                                </Grid>
                            )
                        })}</> : <><Typography>Oops! That project does not exist</Typography></>}

                    </Grid>
                </AppLayout>
            </div>
        )
    } else {
        return (
            <Grid>

                <Typography>Oops! That project does not exist</Typography>
            </Grid>
        )

    }
}

export default ProjectTasks