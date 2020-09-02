import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SiteContext } from './app'
import About from './components/about'
import Index from './components/index'
import Category from './components/post-by-category'
import Categories from './components/categories'
import Tag from './components/post-by-tag'
import Navigation from './components/navigation'
import Post from './components/post'
import Footer from './components/footer'

const Routes = props => {
  const { siteUri } = useContext(SiteContext)

  return (
    <Router>
      <Navigation />
      <div className='body-content'>
        <Switch>
          <Route path={`${siteUri}/`} exact component={Index} />
          <Route path={`${siteUri}/post/tag/:slug`} exact component={Tag} />
          <Route path={`${siteUri}/post/:slug`} exact component={Post} />
          <Route path={`${siteUri}/categories/category/:slug`} exact component={Category} />
          <Route path={`${siteUri}/categories`} exact component={Categories} />
          <Route path={`${siteUri}/about`} exact component={About} />
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
