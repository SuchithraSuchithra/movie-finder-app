import React, { useState } from 'react'
import {
  ListItemIcon,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
} from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

export default function VisitorMenu() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleLogIn(e) {
    e.preventDefault()
    navigate(`/login`)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    // <Box>
    //   <Menu
    //     id='simple-menu'
    //     anchorEl={anchorEl}
    //     keepMounted
    //     open={Boolean(anchorEl)}
    //     onClose={handleClose}
    //   >
    //     <MenuItem onClick={handleLogIn}>
    //       <ListItemIcon>
    //         <LogoutIcon />
    //       </ListItemIcon>
    //       <ListItemText>login</ListItemText>
    //     </MenuItem>
    //   </Menu>
    // </Box>
    <Box>
      <IconButton color='inherit' onClick={handleClick}>
        <Tooltip title={<Typography variant='body2'></Typography>}>
          <Avatar></Avatar>
        </Tooltip>
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>{<ListItemText></ListItemText>}</MenuItem>
        <MenuItem onClick={handleLogIn}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>login</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
