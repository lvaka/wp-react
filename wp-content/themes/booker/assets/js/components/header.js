import React, { useContext } from 'react'
import { SiteContext } from '../app'

const Header = () => {
  const { stylesheetUri } = useContext(SiteContext)
  const bkgImage = {
    backgroundImage: `url("${stylesheetUri}/assets/images/Second_Battle.jpg")`
  }

  return (
    <header id='header' style={bkgImage}>
      <div className='scrim' />
      <div id='site-title' className='container'>
        <h1 className='text-center'>L_Vaka Blog</h1>
        <p className='text-center'>The Easiest Way to Read My Mind</p>
      </div>
    </header>
  )
}

export default Header
