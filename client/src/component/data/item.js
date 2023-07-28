import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';

import ErrorIcon from '@mui/icons-material/Error';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';


const Menu =[
    {
     title:"Dashboard",
     icon:<DashboardIcon className='icon' color='secondary' sx={{
        fontSize:"50px"
     }}/>,
     path:"/dashboard"
    },
    {
        title:"Add Product",
        icon:<ProductionQuantityLimitsIcon className='icon' color='secondary' sx={{
            fontSize:"50px"
         }}/>,
        path:"/addproduct"
    },
    {
        title:"Profile",
        icon:<ContactPageIcon className='icon' color='secondary' sx={{
            fontSize:"50px"
         }}/>,
        children : [
            {
              title:"Change profile",
              path:"/changeprofile"
            },
            {
                title:"Contact Us",
                path:"/contactus"
            }
        ]

        
    },
    {
        title:"Report Bug",
        icon:<ErrorIcon className='icon' color='secondary' sx={{
            fontSize:"50px"
         }}/>,
        path:"/reportbug"
    }
]


export default Menu