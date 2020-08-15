/***
Init React App and load style sheet.
*/
import '../sass/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'

const Root = props => <Routes {...props} />
const rootElem = document.getElementById('root')
if (rootElem) {
  ReactDOM.render(<Root />, rootElem)
}
