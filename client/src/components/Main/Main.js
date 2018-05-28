import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.scss'

const Main = ({ className, children }) => (
  <main className={`${style.root} ${className}`}>
    {children}
  </main>
)

Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

Main.defaultProps = {
  className: ''
}

export default Main
