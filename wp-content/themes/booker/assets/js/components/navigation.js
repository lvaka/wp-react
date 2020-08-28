import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { SiteContext } from '../app'

const Nav = props => {
  const { siteUri } = useContext(SiteContext)
  const [active, setActive] = useState(false)

  const burgerClasses = ['burger']
  const menuClasses = ['']

  const toggleMenu = () => {
    active ? setActive(false) : setActive(true)
  }

  if (active) {
    burgerClasses.push('active')
    menuClasses.push('active')
  }

  return (
    <nav id='navigation'>
      <div className='container'>
        <div className='d-flex d-md-none justify-content-end'>
          <button className={burgerClasses.join(' ')} onClick={toggleMenu}>
            <i className='fas fa-bars' />
          </button>
        </div>
        <div className='row'>
          <div className='col-md-2 d-none d-md-block'>
            <NavLink to={siteUri} active='active'>
              Home
            </NavLink>
          </div>
          <div className='col-md-10'>
            <ul className={menuClasses.join(' ')}>
              <li className='d-block d-md-none'>
                <NavLink to={siteUri} active='active' onClick={toggleMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={`${siteUri}/categories`} active='active' onClick={toggleMenu}>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to={`${siteUri}/about`} active='active' onClick={toggleMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to={`${siteUri}/contact`} active='active' onClick={toggleMenu}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
