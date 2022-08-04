import {Button, Dialog, Grid, Typography} from '@mui/material'
import React from 'react'

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    message: string
}

const DeletionModal = (props: Props) =>
{
    const {open, setOpen, message} = props
  return (
      <Grid>
          <Dialog
              open={open}
              onClose={()=>{}}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <Grid container justifyContent="center" sx={{padding: "1rem"}}>
                  <Grid item> <Typography>{message}</Typography></Grid> 
                  <Grid item>
                      <Grid item sx={{marginTop: "3rem"}}>
                          <Grid container spacing={4}>
                              
                              <Grid item sx={{}}>
                                  <Button variant="outlined" color="secondary" sx={{width: "100%"}} onClick={() => {setOpen(false)}}>Close</Button>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>   
          </Dialog>   
    </Grid>
  )
}

export default DeletionModal