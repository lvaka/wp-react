/***
Init React App and load style sheet.
*/
import '../sass/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import Header from './components/header'

const uris = {
  siteUri: document.querySelector('meta[name="site_uri"]').content,
  stylesheetUri: document.querySelector('meta[name="stylesheet_uri"]').content,
  siteAbsUri: document.querySelector('meta[name="site_abs_uri"]').content
}

const SiteContext = React.createContext()

const Root = props => (
  <SiteContext.Provider value={uris}>
    <Header />
    <Routes {...props} />
  </SiteContext.Provider>
)

const rootElem = document.getElementById('root')
if (rootElem) {
  ReactDOM.render(<Root />, rootElem)
}

export { SiteContext }
