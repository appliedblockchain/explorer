import React from 'react'
import PropTypes from 'prop-types'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

const TransactionView = ({ info }) => (
  <section className={style.root}>
    <div className={style.title}>
      <Text variant="title">
        Transaction Info
      </Text>
    </div>

    <Paper>
      <Table>
        <TableBody>
          {/** From address */}
          <TableRow>
            <TableCell component="th" scope="row">From</TableCell>
            <TableCell>
              <span className={style.mono}>{info.from}</span>
            </TableCell>
          </TableRow>

          {/** To address */}
          <TableRow>
            <TableCell component="th" scope="row">To</TableCell>
            <TableCell>
              <span className={style.mono}>{info.to}</span>
            </TableCell>
          </TableRow>

          {/** Block */}
          <TableRow>
            <TableCell component="th" scope="row">Block</TableCell>
            <TableCell>
              <Link className={style.link} to={`/blocks/${info.blockNumber}`}>
                {info.blockNumber}
              </Link>
            </TableCell>
          </TableRow>

          {/** Data */}
          <TableRow>
            <TableCell component="th" scope="row">Data</TableCell>
            <TableCell>
              <span className={style.data}>{info.input}</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  </section>
)

TransactionView.propTypes = {
  info: PropTypes.object.isRequired
}

export default TransactionView
