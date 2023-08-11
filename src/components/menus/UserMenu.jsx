import React, { useState } from 'react'
import {
  ListItemIcon,
  Divider,
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

export default function UserMenu({ onLogOut, user }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleLogOut() {
    onLogOut()
  }

  return (
    <Box>
      <IconButton color='inherit' onClick={handleClick}>
        <Tooltip
          title={
            <Typography variant='body2'>{user.email.split('@')[0]}</Typography>
          }
        >
          <Avatar className='picture' src='' />
        </Tooltip>
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          {<ListItemText>{user.email.split('@')[0]}</ListItemText>}
        </MenuItem>
        <Divider sx={{ my: 0.2 }} />
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
