import {Box, Grid, LinearProgress, LinearProgressProps, Typography} from '@mui/material';
import React from 'react'

type Props = {

}

const LinearProgressBar = (props: LinearProgressProps & {value: number} ) => {
 
          return (
              <Box sx={{marginTop: "1rem"}}>
                  <Box sx={{width: '100%', mr: 1}}>
                      <LinearProgress color="secondary" sx={{height: "1rem", borderRadius: "1rem", }} variant="determinate" {...props} />
                  </Box>
                  <Grid container justifyContent="space-between" direction="row" sx={{marginTop: "1rem"}}>
                      <Grid item >
                          <Typography>Progress:</Typography>
                      </Grid>
                      <Grid item >
                          <Box sx={{minWidth: 35}}>
                              <Typography component="p" color="text.secondary">
                                  {`${Math.round(
                                      props.value,
                                  )}%`}
                              </Typography>
                          </Box>
                      </Grid>
                  </Grid>

              </Box>
          );
   
}

export default LinearProgressBar