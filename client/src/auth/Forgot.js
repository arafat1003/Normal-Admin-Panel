import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ForgotFunction } from '../configuration/authconfiguration'
const initialState = {
  password:"",
  password2:""
}

const Forgot = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState(initialState)
  const {password,password2} = formData
  const {hashToken} = useParams()
  const setHandleInputChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({...formData, [name]: value} );
  
};
  const Forgot=async(e)=>{
    e.preventDefault()

    if(!password){
      return toast.error("no Password is found")
    }
    if(password < 6){
      return toast.error("password is too small")

    }
    if(password !== password2){
      return toast.error("password is not matched")
    }
    const Userpassword = {
      password,
      password2
    }

    try{
      const data = await ForgotFunction(Userpassword,hashToken)
      toast.success(data.message)
      navigate('/login')
    }
    catch(error){
     toast.error("not successful")
    }
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
      <Grid item>
        <Grid container direction="column">
          <Typography variant='h4'>Set new Password</Typography>
          <TextField value={password} onChange={setHandleInputChange} type='password' name="password" label="new Password"/>
            <TextField value={password2} onChange={setHandleInputChange} type='password' name="password2" label="new Password"/>
          <Button onClick={Forgot} variant='contained'>Submit New Password</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Forgot