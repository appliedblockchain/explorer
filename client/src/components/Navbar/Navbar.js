import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Text from '@material-ui/core/Typography'

const Navbar = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Text variant="title" color="inherit">
        Block Explorer
      </Text>
    </Toolbar>
  </AppBar>
)

export default Navbar
