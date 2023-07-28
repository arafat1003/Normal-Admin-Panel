import { Grid,Button, IconButton } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Menu from '../data/item';
import Sidebaritem from './sidebaritem';



const Sidebar = ({handletheClick,isOpen}) => {


  const handleClick = ()=>{
    handletheClick()
  }


  return (
    <Grid marginRight={isOpen ? "" : "5rem"}  container direction="column">
      <Grid item>
        <Grid sx={{backgroundColor:"#0a1930", minHeight:"80px",padding:"10px"}} container direction="row" justifyContent={isOpen ? "space-between":"center"} alignItems='center'>
          <Grid item>
         <AccessibilityNewIcon sx={{display:isOpen? "block" : "none"}} color='primary' fontSize='large'/>
          </Grid>
          <Grid item>
          <IconButton onClick={handleClick}>
          <MenuIcon  sx={{ marginRight: isOpen ?  "0" : "25px"}}  color='primary' fontSize='large'  />
          </IconButton>
          </Grid>
        </Grid>
        <Grid item>
       
         {Menu.map((item,key)=>{
           return <Sidebaritem item={item} key={key} isOpen={isOpen}/>
          })}
         
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Sidebar