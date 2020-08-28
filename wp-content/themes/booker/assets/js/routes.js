import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SiteContext } from './app'
import Index from './components/index'
import Navigation from './components/navigation'
import Post from './components/post'
import Footer from './components/footer'

const Routes = props => {
  const siteContext = useContext(SiteContext)

  return (
    <Router>
      <Navigation />
      <div className='body-content'>
        <Switch>
          <Route path={`${siteContext.siteUri}/`} exact component={Index} />
          <Route path={`${siteContext.siteUri}/`} exact component={Post} />
          <Route path={`${siteContext.siteUri}/about`} exact>
            <h1>About</h1>
          </Route>
          <Route status={401}>
            <h1>401</h1>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  )
}

export default Routes
