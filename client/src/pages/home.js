import React from 'react'
import Appbar from '../component/appbar'
import { Grid,Button,Typography, Box } from '@mui/material'
import Invimg from "../image/assets/inv-img.png"
import { useSelector,useDispatch } from 'react-redux'
import { SET_LOGIN, isloggedInn } from '../redux/features/authSlicer'



const Home = () => {
  const dispatch = useDispatch()
  const selectlogin = useSelector(isloggedInn)
 const loooed = async(e)=>{
  e.preventDefault()
  dispatch(SET_LOGIN(true))
  console.log(selectlogin)
}
 
  return (
    <>
      <Appbar/>
       <div style={{minHeight:"54px"}}></div>
       <Grid disablePadding container justifyContent="center" alignItems="center" direction="row" sx={{
        backgroundColor:"#0a1930",
        height:"700px"
       }}>
        <Grid item>
          <Grid container sx={{
            marginTop:"-20px",
            lineHeight:"20px"
          }} justifyContent="flex-end" direction="column">
            <Grid item>
              <Typography variant='h3'  sx={{
                color:"white",
                fontWeight:"bolder"
              }} > Inventory & Stock <br/> Management <br/> Solution</Typography>
            </Grid>
            <Grid item >
              <Typography sx={{
                marginTop:"5px",
                color:"white",
                fontWeight:"bolder",
                fontStyle:"oblique"
              }} variant='p'>
                 Inventory system to control and manage products in the <br/> warehouse in real time and integrated to make it easier to <br/> develop your business
              </Typography>

            </Grid>
            <Grid item>
              <Button sx={{
                color:"white",
                backgroundColor:"#0c2683",
                marginTop:"15px",
                marginBottom:"10px",
                
              }} onClick={loooed} variant='outlined' >Free trial 1 Month</Button>
            </Grid>
            <Grid item>
              <Grid container sx={{
                "& 	.MuiTypography-h3":{
                  color:"white",
                  
                },
                "& 	.MuiTypography-p":{
                  color:"white",
                  fontFamily: "Castoro Titling",
                  fontWeight:"bolder",
                  height:"5px"
                }
              }} spacing={4} direction="row">
               <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant='h3'>
                      14K
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='p'>
                      Brand owners
                    </Typography>
                  </Grid>
                </Grid>
               </Grid>
               <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant='h3'>
                      23K
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='p'>
                      Active Users
                    </Typography>
                  </Grid>
                </Grid>
               </Grid>
               <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant='h3'>
                      500+
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='p'>
                      Partners
                    </Typography>
                  </Grid>
                </Grid>
               </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
        <Grid item>
          <Grid conatiner>
          <Box component="img" sx={{
            height:"500px"
          }} src={Invimg} alt='image'  />
          </Grid>
        </Grid>
       </Grid>
    </>
  )
}

export default Home