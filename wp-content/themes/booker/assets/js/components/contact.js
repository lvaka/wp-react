import React, { useContext, useRef } from 'react'
import axios from 'axios'
import { SiteContext } from '../app'

const Contact = () => {
  const { siteUri } = useContext(SiteContext)
  const formRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    const form = new FormData(formRef.current)
    for (const data of form.entries()) {
      console.log(data)
    }
    axios.post(`${siteUri}/wp-json/contact/v1/new`, form)
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  return (
    <div id='contact'>
      <div className='container'>
        <div className='col-md-8 offset-md-2'>
          <h1 className='mb-5'>Contact Me</h1>
          <form className='form' onSubmit={handleSubmit} ref={formRef}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label>Name</label>
                  <input className='form-control' type='text' name='name' placeholder='Name' required />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label>Email</label>
                  <input className='form-control' type='email' name='email' placeholder='Email' required />
                </div>
              </div>
            </div>
            <div className='form-group'>
              <label>Message</label>
              <textarea
                className='form-control'
                rows='6'
                name='message'
                placeholder='Leave me a message...'
                required
              />
            </div>
            <div className='form-group'>
              <input className='btn btn-primary' type='submit' value='SEND' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
