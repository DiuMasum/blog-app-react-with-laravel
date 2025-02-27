import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    const fetchBlog = async () => {
        const res = await fetch("http://localhost:8000/api/blogs/"+params.id)
        const result = await res.json();
        setBlog(result.data);
        // console.log(params.id)
    }

    useEffect(() => {
        fetchBlog();
    }, []);

  return (
    <div className='container'>
      <div className="d-flex justify-content-between pt-5">
        <h2>{blog.title}</h2>
        <div>
        <a href="/" className='btn btn-dark'>bank to blogs</a>
        </div>
      </div>
      <div className='row pt-5 mb-4'>
        <div className="col-md-12">
            <p>by <strong>{blog.author}</strong> on {blog.date}</p>

            {
                (blog.image) && <img className='w-100' src={`http://localhost:8000/api/blogs/${blog.image}`} />
            }

            <div>
                {blog.description}
            </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
