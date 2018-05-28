import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Block } from './Block'
import { Transaction } from './Transaction'
import { Home } from './Home'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/blocks/:number" component={Block} />
      <Route exact path="/transactions/:txhash" component={Transaction} />
      <Route render={() => <p>Not Found :(</p>} />
    </Switch>
  </Router>
)

export default App
