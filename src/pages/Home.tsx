import {Button, Grid, TextField, Typography, Card, CircularProgress, Alert} from '@mui/material'
import React, {useState} from 'react'
import {object, string} from "yup";
import {Field, Form, Formik, useFormik} from 'formik';
import heroImage from '../assets/lilartsy-333oj7zFsdg-unsplash.jpg'
import {api, useLoginMutation} from '../redux/services/auth';
import {setCredentials, userDetails} from '../redux/slices/AuthSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useNavigate} from 'react-router-dom';

type Props = {}

const Home = (props: Props) =>
{
  const [login, {isLoading, data, isError, error}] = useLoginMutation()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  return (
    <Grid container sx={{height: "100vh", backgroundColor: "#fafafa"}} direction="row" justifyContent="center" alignItems="center">
      <Grid item md={6} >
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item><Typography variant="h1">Notesy</Typography></Grid>
          <Grid item><Typography>Keep track of your project schedule</Typography></Grid>
          <Grid item>
            <Card sx={{padding: "1rem", marginTop: "2rem"}}>
              <Grid container justifyContent="center">  <Grid item > <Typography variant="h5">Login</Typography></Grid></Grid>
              <Formik
                initialValues={{
                  username: 'kminchelle',
                  password: '0lelplR',
                }}
                validationSchema={object({
                  username: string()
                    .required("Please a valid username"),
                  password: string()
                    .required("Please enter valid password")
                })}
                onSubmit={(values, formikHelpers) =>
                {


                  const api = async () =>
                  {

                    //  login({id: 1, name: 'Example'})
                    //     .unwrap()
                    //     .then((payload) => console.log('fulfilled', payload))
                    //     .catch((error) => console.error('rejected', error))
                    try {
                      const userDetails = await login(values).unwrap()
                      dispatch(setCredentials(userDetails))
                      navigate('/dashboard')
                    } catch (err) {
                      // setError(err? err.data.message : '')
                    
                      
                    }
                  }
                  api();
                  // // formikHelpers.resetForm();

                }}
              >
                {({errors, isValid, touched, dirty}) => (
                  <Form>
                    {isError ? <Alert severity="error" color="error">
                      {JSON.stringify(error, null, 2)}
                    </Alert> : null}  
                    < Field
                      label="Enter your username "
                      as={TextField}
                      name='username'
                      fullWidth
                      margin="normal"
                      type="text"
                      variant="outlined"
                      size="small"
                      // value={formik.values.msisdn}
                      // onChange={formik.handleChange}
                      error={Boolean(errors.username) && Boolean(touched.username)}
                      helperText={Boolean(touched.username) && errors.username}

                    />

                    <Field
                      as={TextField}
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      size="small"
                      name='password'
                      // value={formik.values.password}
                      // className={textField} 
                      // onChange={formik.handleChange}
                      error={Boolean(errors.password) && Boolean(touched.password)}
                      helperText={Boolean(touched.password) && errors.password}
                      required
                    />
                    <Grid container justifyContent="center" alignItems="center"><Grid item sx={{marginTop: "1rem"}}> <Button type='submit' variant="contained" color="secondary"  >{isLoading ? <CircularProgress /> : "Login"}</Button></Grid></Grid>
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>

      </Grid>
      <Grid item sx={{height: "100%"}} md={6}>
        <Grid sx={{height: "100%"}} container justifyContent="center" alignItems="center">
          <Grid item sx={{}}> <img src={heroImage} style={{width: "80%", height: "80%", backgroundRepeat: "no-repeat"}} /></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home