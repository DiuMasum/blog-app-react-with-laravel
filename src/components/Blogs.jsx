import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:8000/api/blogs');
    const result = await res.json();
    setBlogs(result.data);
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className='container'>
      <div className="d-flex justify-content-between pt-5">
        <h4>Blogs</h4>
        <a href="/create" className='btn btn-dark'>create</a>
      </div>
      <div className='row pt-5 mb-4'>
        {
          (blogs) && blogs.map((blog) => {
            return (<BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id}/>)
          })
        }
      </div>
    </div>
  )
}

export default Blogs
