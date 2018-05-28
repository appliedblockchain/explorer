import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Block } from './Block'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <p>TODO</p>} />
      <Route exact path="/blocks/:number" component={Block} />
      <Route exact path="/transactions/:txhash" render={() => <p>TODO: Transaction</p>} />
      <Route render={() => <p>Not Found :(</p>} />
    </Switch>
  </Router>
)

export default App
