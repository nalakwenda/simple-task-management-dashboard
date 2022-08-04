import {Button, Dialog, Grid, TextField, Typography} from '@mui/material'
import {Field, Form, Formik, useFormik} from 'formik';
import {object, string} from "yup";
import React, {useState} from 'react'
import ConfirmationModal from './ConfirmationModal'
import {v4 as uuidv4} from 'uuid';
import {addProject} from '../redux/slices/ProjectsSlice';
import {useAppDispatch} from '../redux/hooks';
import {ProjectI} from '../types/Project';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void
}

const AddProject = (props: Props) =>
{
    const {open, setOpen} = props
    const [confirmation, setConfirmation] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const dispatch = useAppDispatch();

    return (
        <Grid>
            <ConfirmationModal message={message} open={confirmation} setOpen={setConfirmation} />
            <Dialog
                open={open}
                onClose={() => {setOpen(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container direction="column" sx={{padding: "1.5rem", width: "100%",}}>
                    <Formik
                        initialValues={{
                            projectId: uuidv4(),
                            projectTitle: '',
                            tasks: []
                        }}
                        validationSchema={object({
                            projectTitle: string()
                                .required("Please enter valid project title"),

                        })}
                        onSubmit={(values, formikHelpers) =>
                        {
                            const updateValues: ProjectI = {
                                projectId: values.projectId,
                                projectTitle: values.projectTitle,
                                tasks: []

                            }
                            console.log(values)

                            dispatch(addProject(updateValues))
                            setConfirmation(true);
                            setMessage(`${values.projectTitle} has been created successfully!`)
                            setOpen(false)

                            // formikHelpers.resetForm();

                        }}
                    >
                        {({errors, isValid, touched, dirty, values, }) => (
                            <Form>
                                <Grid container direction="column"  sx={{width: "100%", }}>
                                    <Grid item><Typography variant="h5">Add Project</Typography></Grid>
                                    <Grid item sx={{width: "30rem", marginBottom:"1rem"}}>
                                        < Field
                                            label="Project Title"
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
                                        <Grid container spacing={1} direction="row" justifyContent="flex-end">

                                            <Grid item sx={{}}>
                                                <Button sx={{width: "100%"}} type="submit" variant="contained" color="secondary" disabled={!isValid || !dirty} >Save</Button>
                                            </Grid>
                                            <Grid item sx={{}}>
                                                <Button sx={{width: "100%"}} variant="outlined" color="error" onClick={() => {setOpen(false)}}>  Cancel</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Dialog>
        </Grid>
    )
}

export default AddProject