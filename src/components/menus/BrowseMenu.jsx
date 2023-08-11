import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import {
  ListItemIcon,
  Divider,
  Menu,
  MenuItem,
  Button,
  ListItemText,
} from '@mui/material'

import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'

export default function BrowseMenu() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleItemClick = (value) => {
    navigate(value)
    handleClose()
  }

  return (
    <>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        color='inherit'
        endIcon={<ExpandMoreIcon />}
        onClick={handleClick}
      >
        BROWSE
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleItemClick('/genres')}>
          {
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
          }
          <ListItemText>Genres</ListItemText>
        </MenuItem>
        <Divider sx={{ my: 0.1 }} />
        <MenuItem onClick={() => handleItemClick('/persons')}>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText>Cast/Crew</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
