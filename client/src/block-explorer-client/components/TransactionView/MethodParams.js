import React from 'react'
import PropTypes from 'prop-types'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import TableCell from './TableCell'
import style from './style.module.scss'

const styles = {
  table: {
    width: '100%',
    tableLayout: 'fixed'
  },
  param: {
    width: '15%'
  },
  paramValue: {
    width: '70%',
    overflow: 'hidden',
    wordWrap: 'break-word'
  }
}

const MethodParams = ({ name, params, classes }) => (
  <section className={style.root}>
    <div className={style.title}>
      <Text variant="title">
        <span className={style.methodName}>{name}( )</span>
      </Text>
    </div>

    <Paper>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.param}>Param</TableCell>
            <TableCell className={classes.param}>Type</TableCell>
            <TableCell className={classes.paramValue}>Value</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {params.map(param => (
            <TableRow key={param.name}>
              <TableCell className={classes.param}>
                {param.name}
              </TableCell>
              <TableCell className={classes.param}>
                {param.type}
              </TableCell>
              <TableCell className={classes.paramValue}>
                {String(param.value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </section>
)

MethodParams.propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MethodParams)
