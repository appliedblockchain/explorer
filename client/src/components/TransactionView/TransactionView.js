import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import MethodParams from './MethodParams'
import EventLogs from './EventLogs'
import style from './style.module.scss'

const TransactionView = ({ info }) => (
  <Fragment>
    <section className={style.root}>
      <div className={style.title}>
        <Text variant="title">Transaction Info</Text>
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
                {info.enhanced && <span>{info.toName}—</span>}
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

            {/** Events */}
            <TableRow>
              <TableCell component="th" scope="row">Events</TableCell>
              <TableCell>{info.logs.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </section>

    {info.enhanced && <MethodParams name={info.method} params={info.params} />}
    {!isEmpty(info.logs) && <EventLogs logs={info.logs} />}
  </Fragment>
)

TransactionView.propTypes = {
  info: PropTypes.object.isRequired
}

export default TransactionView
