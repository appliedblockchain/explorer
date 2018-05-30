import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Text from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

const EventLogs = ({ logs }) => (
  <section className={style.root}>
    <div className={style.title}>
      <Text variant="title">
        Event Logs
      </Text>
    </div>

    {logs.map(({ data, topics, logIndex }, idx) => (
      <ExpansionPanel key={idx}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Text>Event {idx + 1}</Text>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <pre>{JSON.stringify({ data, topics, logIndex }, null, 2)}</pre>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
  </section>
)

EventLogs.propTypes = {
  logs: PropTypes.array.isRequired
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const MethodParams = ({ name, params }) => (
  <section className={style.root}>
    <div className={style.title}>
      <Text variant="title">
        <span className={style.methodName}>{name}( )</span>
      </Text>
    </div>

    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <CustomTableCell>Param</CustomTableCell>
            <CustomTableCell>Type</CustomTableCell>
            <CustomTableCell>Value</CustomTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {params.map(param => (
            <TableRow key={param.name}>
              <CustomTableCell>{param.name}</CustomTableCell>
              <CustomTableCell>{param.type}</CustomTableCell>
              <CustomTableCell>{String(param.value)}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </section>
)

MethodParams.propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.array.isRequired
}

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
