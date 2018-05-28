import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Text from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

const Navbar = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Text variant="title" color="inherit">
        <Link to="/" className={styles.link}>Block Explorer</Link>
      </Text>
    </Toolbar>
  </AppBar>
)

export default Navbar
