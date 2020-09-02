import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SiteContext } from '../../app'

const Category = props => {
  const { siteUri } = useContext(SiteContext)
  const link = `${siteUri}/categories/category/${props.slug}`
  return (
    <li>
      <Link to={link}>
        {props.name}
      </Link>
    </li>
  )
}

const Categories = props => (
  <ul className='post-categories'>
    {props.categories.map((category, k) => <Category {...category} key={`cat-${k}`} />)}
  </ul>
)

export default Categories
