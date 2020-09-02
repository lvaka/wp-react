import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SiteContext } from '../app'

const Post = props => {
  const [post, setPost] = useState(null)
  const slug = props.match.params.slug
  const { siteUri } = useContext(SiteContext)

  useEffect(() => {
    axios.get(`${siteUri}/wp-json/posts/v1/post/${slug}`)
      .then(res => setPost(res.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div id='single-post'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            {!post &&
              <div className='loading'>
                Loading
                <span>.</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>}
            {post &&
              <div className='post'>
                {post.attached_media.length > 0 &&
                  <figure
                    className='feat_img'
                    dangerouslySetInnerHTML={{ __html: post.attached_media }}
                  />}
                <h1 className='mb-0'>{post.post_title}</h1>
                {post.categories.length > 0 &&
                  <ul className='categories'>
                    {post.categories.map((cat, k) =>
                      <li key={`post-category-${k}`}>
                        <Link to={`${siteUri}/categories/category/${cat.slug}`}>
                          {cat.name}
                        </Link>
                      </li>
                    )}
                  </ul>}
                {post.tags.length > 0 &&
                  <ul className='post-tags'>
                    {post.tags.map((tag, k) => (
                      <li key={`tag-${k}`}>
                        <Link to={`${siteUri}/post/tag/${tag.slug}`} className='post-tag'>
                          {tag.name}
                        </Link>
                      </li>
                    )
                    )}
                  </ul>}
                <div
                  className='content'
                  dangerouslySetInnerHTML={{ __html: post.post_content }}
                />
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
