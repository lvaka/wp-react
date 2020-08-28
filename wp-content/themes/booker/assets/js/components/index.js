import React from 'react'
import Posts from './index/posts'

const Index = props => (
  <div id='page-index'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 mb-2 offset-md-2'>
          <Posts />
        </div>
      </div>
    </div>
  </div>
)

export default Index
