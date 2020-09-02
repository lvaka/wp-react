import React, { useContext, useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import { SiteContext } from '../app'
import { initState, postsReducer, PostPrev } from './index/posts'

const Tag = props => {
  const [tagID, setTagID] = useState(null)
  const { siteUri } = useContext(SiteContext)
  const slug = props.match.params.slug
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
      'per_page=5',
      `tags=${tagID}`].join('&')

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
    if (tagID && state.loading) {
      getPosts()
    }
  }, [state.loading])

  useEffect(() => {
    dispatch({ type: 'loading' })
  }, [tagID, state.page])

  useEffect(() => {
    axios.get(`${siteUri}/wp-json/tags/v1/tag/${slug}`)
      .then(res => {
        dispatch({ type: 'initState' })
        return res
      })
      .then(res => setTagID(res.data.id))
      .catch(e => console.log(e))
  }, [slug])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div id='posts'>
            <h1 className='py-4'>Posts with Tag {slug}</h1>
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
              <button
                className='btn btn-primary my-5'
                onClick={() => dispatch({ type: 'pageIncrement' })}
              >
                Load More
              </button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tag
