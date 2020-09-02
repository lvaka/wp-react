import React, { useState, useEffect, useContext, useReducer } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { SiteContext } from '../../app'
import Categories from './categories'
import Feat from '../feat'

const PostPrev = props => {
  const { siteAbsUri, siteUri } = useContext(SiteContext)
  const link = props.link.replace(siteAbsUri, siteUri)
  const author = props._embedded.author[0].name
  const categories = props._embedded['wp:term'][0]
  const tags = props._embedded['wp:term'][1]

  return (
    <div className='post'>
      <div className='row'>
        <div className='col-md-10'>
          {props.featured_media > 0 &&
            <Link
              to={link}
              className='d-inline d-md-none'
            >
              <Feat {...props._embedded['wp:featuredmedia'][0]} />
            </Link>}
          <Link to={link}><h2>{props.title.rendered}</h2></Link>
          <Categories categories={categories} />
          <p className='post-excerpt' dangerouslySetInnerHTML={{ __html: props.excerpt.rendered }} />
          <ul className='post-tags'>
            {tags &&
              tags.map((tag, k) => (
                <li key={`tag-${k}`}>
                  <Link to={tag.link.replace(siteAbsUri, siteUri)} className='post-tag'>
                    {tag.name}
                  </Link>
                </li>
              )
              )}
          </ul>
          <p className='post-details'>By: {author} | {moment(props.date).format('LL')}</p>
        </div>
        <div className='col-md-2 d-none d-md-flex align-items-center'>
          {props.featured_media > 0 &&
            <Link
              to={link}
            >
              <Feat {...props._embedded['wp:featuredmedia'][0]} />
            </Link>}
        </div>
      </div>
    </div>
  )
}

const initState = { page: 1, totalPages: 1, posts: [], loading: false }

const postsReducer = (state, action) => {
  const actions = {
    pageIncrement: {
      ...state,
      page: state.page + 1
    },
    setPosts: {
      ...state,
      totalPages: action.totalPages,
      posts: [...state.posts].concat(action.posts)
    },
    initState: {
      ...initState
    },
    loading: {
      ...state,
      loading: true
    },
    loaded: {
      ...state,
      loading: false
    }
  }
  return actions[action.type]
}

const Posts = props => {
  const { siteUri } = useContext(SiteContext)
  const [state, dispatch] = useReducer(postsReducer, initState)

  const getPosts = () => {
    const fields = [
      'id',
      'title',
      'featured_media',
      'excerpt',
      'link',
      '_links',
      'categories',
      'tags'].join(',')
    const params = [
      '_embed',
      `_fields=${fields}`,
      `page=${state.page}`,
      'per_page=5'].join('&')

    axios.get(`${siteUri}/wp-json/wp/v2/posts?${params}`)
      .then(res => {
        dispatch({
          type: 'setPosts',
          totalPages: res.headers['x-wp-totalpages'],
          posts: res.data
        })
      })
      .then(() => dispatch({ type: 'loaded' }))
      .catch(e => console.log(e))
  }

  useEffect(() => {
    if (state.loading) {
      getPosts()
    }
  }, [state.loading])

  useEffect(() => dispatch({ type: 'loading' }), [state.page])

  return (
    <div id='posts'>
      {state.posts &&
        state.posts.map((post, k) => <PostPrev key={`post-${k}`} {...post} />)}
      {state.loading &&
        <div className='loading'>
                Loading
          <span>.</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>}
      {state.totalPages > state.page &&
        <button className='btn btn-primary my-5' onClick={() => dispatch({ type: 'pageIncrement' })}>
          Load More
        </button>}
    </div>
  )
}

export default Posts
export { initState, postsReducer, PostPrev }
