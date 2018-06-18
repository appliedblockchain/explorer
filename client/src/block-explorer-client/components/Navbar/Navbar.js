import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Logo from './Logo'

const styles = {
  appbar: {
    backgroundColor: '#4396ec'
  },
  toolbar: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const Navbar = ({ classes }) => (
  <AppBar position="static" className={classes.appbar}>
    <Toolbar className={classes.toolbar}>
      <Link to="/" className={styles.link}>
        <Logo />
      </Link>
    </Toolbar>
  </AppBar>
)

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)
