import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SiteContext } from '../app'

const Category = props => {
  const { siteUri } = useContext(SiteContext)
  const link = `${siteUri}/categories/category/${props.slug}`
  return (
    <li>
      <Link to={link}>
        <h2>{props.name}</h2>
      </Link>
      <p>{props.description}</p>
    </li>
  )
}

const Categories = props => {
  const [categories, setCategories] = useState(null)
  const { siteUri } = useContext(SiteContext)

  useEffect(() => {
    axios.get(`${siteUri}/wp-json/wp/v2/categories`)
      .then(res => setCategories(res.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='categories'>
            <h1>Categories</h1>
            {categories &&
              <ul className='category-list'>
                {
                  categories.map((cat, k) =>
                    <Category key={`cat-${k}`} {...cat} />
                  )
                }
              </ul>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
