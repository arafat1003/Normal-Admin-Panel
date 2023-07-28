import { Collapse, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,List } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const Sidebaritem = ({ item, key, isOpen }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  

    if(item.children){
   return(
    <list
    component="nav"
     sx={{ width: '80%', 
     bgcolor: 'background.paper',
      paddingRight:isOpen ? "" : "0rem",
   
     "& .MuiListItemIcon-root":{
       
      width:"7rem",

     }
    
      }}
      disablePadding
     key={key}>
    <ListItem sx={{
      paddingRight:isOpen ? "6px" : "0rem"
    }}>
      <ListItemButton sx={{
      paddingRight:isOpen ? "6px" : "0rem"
    }} onClick={handleClick}>
        <ListItemIcon sx={{
          minWidth:"5rem"
        }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText sx={{
          display:isOpen ? "block": "none"
        }} primary={item.title}/>
       
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
       </ListItem>
        <Collapse key={key} in={open} timeout={200} unmountOnExit orientation="horizontal">
              
              {item.children.map((items,key)=>{
                return(
               
                  <List component="div" disablePadding>
                
          <ListItem>
          <ListItemButton sx={{pl:6  }}>
                  <ListItemText sx={{
          display:isOpen ? "block": "none"
        }} key={key} primary={items.title} />
                  </ListItemButton>
          </ListItem>
     </List>
                )
              })}
            
              </Collapse>
    
  </list>
   )

    }
else{
return(
  <list>
  <ListItem>
    <ListItemButton>
      <ListItemIcon  sx={{
          minWidth:"5rem"
        }}>
{item.icon}
      </ListItemIcon>
      <ListItemText sx={{
          display:isOpen ? "block": "none"
        }} primary={item.title}/>
    </ListItemButton>
  </ListItem>
</list>
)
}
   
  
};

export default Sidebaritem;
