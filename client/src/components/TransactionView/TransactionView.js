import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import capitalize from 'lodash/capitalize'
import ReactJson from 'react-json-view'
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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const EventLogs = ({ logs }) => (
  <section className={style.root}>
    <div className={style.title}>
      <Text variant="title">Event Logs</Text>
    </div>

    {/** @NOTE: Events with params are expanded to show params table */}
    {logs.map(({ id, data, topics, logIndex, name, params }, idx) => (
      <ExpansionPanel key={id} defaultExpanded={Array.isArray(params)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Text>{isString(name) ? `${name}( )` : `Event ${idx + 1}`}</Text>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          {isString(name) && Array.isArray(params)
            ? (
              <div style={{ width: '100%' }}>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Param</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Indexed</TableCell>
                        <TableCell>Value</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {params.map(param => (
                        <TableRow key={param.name}>
                          <CustomTableCell>{param.name}</CustomTableCell>
                          <CustomTableCell>{param.type}</CustomTableCell>
                          <CustomTableCell>{capitalize(String(param.indexed))}</CustomTableCell>
                          <CustomTableCell>{String(param.value)}</CustomTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            )
            : <ReactJson src={{ id, data, topics, logIndex }} />
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
  </section>
)

EventLogs.propTypes = {
  logs: PropTypes.array.isRequired
}

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
