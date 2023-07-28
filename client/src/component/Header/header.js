import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { logOutFunction } from '../../configuration/authconfiguration'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN, nameoftheuser } from '../../redux/features/authSlicer'
import { toast } from 'react-toastify'

const Header = () => {

  const name = useSelector(nameoftheuser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
   const logOut = async()=>{
   try{
    await logOutFunction();
    await dispatch(SET_LOGIN(false))
   
    navigate("/")
    return toast.success("You got yourselg log outed from the fucking hell")
   }
   catch (error){
     return toast.error("not logout")
   }
  }
  return (
    <Grid container direction="row" justifyContent="space-between"> 
     <Grid item>
        <Typography variant="h3">
            Hello {name}, <span style={{color:"yellow", fontWeight:"bolder" ,fontSize:"20px"}} > Welcome to your Page</span>
        </Typography>
     </Grid>
     <Grid item>
        <Button onClick={logOut} sx={{marginLeft:"auto"}} varient="contained">
            Log Out
        </Button>
     </Grid>


    </Grid>
  )
}

export default Header