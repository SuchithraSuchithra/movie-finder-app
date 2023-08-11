import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import './VisitorNavBar.css'
import VisitorMenu from './menus/VisitorMenu'

export default function VisitorNavBar() {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Grid container>
          <Grid item xs={0} md={2} />
          <Grid item xs={12} md={8} className='mainGridItem'>
            <Box className='leftBox'>
              <Box className='titleBox'>
                <Link
                  to='/'
                  component={RouterLink}
                  color='inherit'
                  underline='none'
                >
                  <Tooltip
                    title={
                      <Typography variant='body2' noWrap>
                        Home
                      </Typography>
                    }
                  >
                    <Typography variant='h5' noWrap>
                      MovieFinder
                    </Typography>
                  </Tooltip>
                </Link>
              </Box>
            </Box>
            <Box className='rightBox'>
              <VisitorMenu></VisitorMenu>
            </Box>
          </Grid>
          <Grid item xs={0} md={2} />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
