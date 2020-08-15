import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const debug = true
let prefix = ''
if (debug) prefix = '/wp-react'

const Routes = props => (
  <Router>
    <Switch>
      <Route path={`${prefix}/`} exact>
        <h1>TEST</h1>
      </Route>
      <Route path={`${prefix}/about`} exact>
        <h1>About</h1>
      </Route>
      <Route status={401}>
        <h1>401</h1>
      </Route>
    </Switch>
  </Router>
)

export default Routes
