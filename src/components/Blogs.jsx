import React from 'react'
import BlogCard from './BlogCard'

const Blogs = () => {
  return (
    <div className='container'>
      <div className="d-flex justify-content-between pt-5">
        <h4>Blogs</h4>
        <a href="/create" className='btn btn-dark'>create</a>
      </div>
      <div className='row pt-5 mb-4'>
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
          <BlogCard/>
      </div>
    </div>
  )
}

export default Blogs
