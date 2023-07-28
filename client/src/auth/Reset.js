import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { ResetFunction, validateemail } from '../configuration/authconfiguration'

const Reset = () => {
   const [email,setEmail] = useState("")


   const Reset = async(e)=>{
   e.preventDefault()
    
    if(!email){
      return toast.error("email is not inputted")
    }

    if(!validateemail(email)){
      return toast.error("no Currect email.inputed")
    }
    const UserEmail={
      email
    }
    try{
      await ResetFunction(UserEmail)
      setEmail("")
    }
    catch(error){
        toast.error(error)
    }

   }


  return (
    <Grid container sx={{
      backgroundColor:"blue",
      position:'fixed',
      top:0,
      height:"100%"
    }} justifyContent="center" alignItems="center" direction="column">
      <Grid item>
        <Grid sx={{
          backgroundColor:"white",
          borderRadius:"25px",
          boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding:"20px 30px"
        }} container direction="row">
          <Grid item>
            <Grid container sx={{
              "& .MuiTypography-root":{
                backgroundcolor: "primary",
    backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
              }
            }}  spacing={2} justifyContent="center" direction="column">
              <Grid item>
                <Typography variant='h4'>Reset Email's Password</Typography>
              </Grid>
              <Grid item>
                <Typography variant='p'>
                  Email
                </Typography>
              </Grid>
              <Grid item>
                <TextField name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email"/>
              </Grid>
              <Grid item>
                <Grid item>
                  <Button onClick={Reset}>Resst the Password</Button>
                </Grid>

                <Link href='/'>
                  <Typography variant='p'>Go back to the Home page</Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Reset