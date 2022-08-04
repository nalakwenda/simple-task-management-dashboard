import {Button, Dialog, Grid, MenuItem, TextField, Typography} from '@mui/material'
import {object, string} from "yup";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {Field, Form, Formik, useFormik} from 'formik';
import {v4 as uuidv4} from 'uuid';
import {addTask} from '../redux/slices/ProjectsSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import React, {useState} from 'react'
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {TaskAndProjectIdsI} from '../types/Project';
import ConfirmationModal from './ConfirmationModal';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void
    projectId: string;

}

const AddTask = (props: Props) =>
{
    const {open, setOpen, projectId} = props
    const dispatch = useAppDispatch();
    const [confirmation, setConfirmation] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    return (
        <Grid container sx={{padding: "1rem"}}>
            <ConfirmationModal message={message} open={confirmation} setOpen={setConfirmation} />
            <Dialog

                open={open}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <Formik
                    initialValues={{
                        taskId: uuidv4(),
                        taskTitle: "",
                        taskDescription: "",
                        status: "In Progress",
                        start: JSON.stringify(new Date()),
                        end: JSON.stringify(new Date()),
                    }}
                    validationSchema={object({
                        taskTitle: string()
                            .required("Please enter valid task title"),
                        taskDescription: string()
                            .required("Please enter valid task description"),
                        start: string()
                            .required("Select enter valid start date"),
                        end: string()
                            .required("Select enter valid end date")
                    })}
                    onSubmit={(values, formikHelpers) =>
                    {
                        const newValues: TaskAndProjectIdsI = {
                            projectId: projectId,
                            task: values

                        }
                        dispatch(addTask(newValues))

                    }}
                >
                    {({errors, isValid, touched, dirty, values, setFieldValue}) => (
                        <Form>
                            <Grid container direction="column" justifyContent="center" sx={{padding: "1rem"}}>
                                <Grid>
                                    <Typography variant="h4">Add Task</Typography>
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
                                        sx={{}}
                                        error={Boolean(errors.taskTitle) && Boolean(touched.taskTitle)}
                                        helperText={Boolean(touched.taskTitle) && errors.taskTitle}

                                    />
                                </Grid>
                                <Grid item sx={{width: "100%"}} >
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
                                        sx={{}}
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
                                        sx={{}}
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
                                    <Grid container justifyContent="space-between" spacing={1} >
                                        <Grid item>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    label="Start"
                                                    value={values.start}
                                                    onChange={(value) =>
                                                    {
                                                        setFieldValue('start', JSON.stringify(value));
                                                    }}
                                                    renderInput={(params) => <TextField {...params} sx={{}} />}
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
                                                        setFieldValue('end', JSON.stringify(value));
                                                    }}
                                                    renderInput={(params) => <TextField {...params} sx={{}} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{marginTop: "2rem"}}>
                                    <Grid container spacing={4}>
                                        <Grid item sx={{width: "50%"}}>
                                            <Button
                                                variant="contained"
                                                disabled={!isValid || !dirty}
                                                color="secondary"
                                                type='submit'
                                                sx={{width: "100%"}}
                                                onClick={() =>
                                                {
                                                    setMessage('You task was added successfully!')
                                                    setConfirmation(true)
                                                    setOpen(false)
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </Grid>
                                        <Grid item sx={{width: "50%"}}>
                                            <Button variant="outlined" color="error" sx={{width: "100%"}} onClick={() => {setOpen(false)}}>Cancel</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>

            </Dialog>
        </Grid>
    )
}

export default AddTask