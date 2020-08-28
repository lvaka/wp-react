import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SiteContext } from '../app'

const Footer = () => {
  const { siteUri } = useContext(SiteContext)
  const today = new Date()
  const year = today.getFullYear()

  return (
    <footer>
      <div className='footer-container'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <h2>Sitemap</h2>
              <ul className='sitemap pl-3'>
                <li>
                  <Link to={`${siteUri}/`}>Home</Link>
                </li>
                <li>
                  <Link to={`${siteUri}/categories`}>Categories</Link>
                </li>
                <li>
                  <Link to={`${siteUri}/about`}>About</Link>
                </li>
                <li>
                  <Link to={`${siteUri}/contact`}>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='container'>
          <small>Booker Theme by&nbsp;
            <a href='https://ericjshin.com' rel='no-follow'>
            Eric J Shin {year}
            </a>
          </small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
