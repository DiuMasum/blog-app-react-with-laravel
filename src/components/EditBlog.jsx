import React, { useEffect } from 'react'
import Editor from 'react-simple-wysiwyg';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBlog = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [html, setHtml] = useState('');
    const [imageId, setimgaeId] = useState('');
  
    const navigate = useNavigate();
  
    function onChange(e) {
      setHtml(e.target.value);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image", file);
    
        const res = await fetch("http://localhost:8000/api/save-temp-image", {
          method: 'POST',
          body: formData
        });
    
        const result = await res.json();
    
        if(result.status == false){
          alert(result.errors.image);
          e.target.value = null;
        }
    
        setimgaeId(result.image.id);
      }

      const fetchBlog = async () => {
        const res = await fetch("http://localhost:8000/api/blogs/"+params.id)
        const result = await res.json();
        setBlog(result.data);
        setHtml(result.data.discription)
        reset(result.data);
    }


      const formSubmit = async (data) => {
        const newData = {...data, "description": html, image_id: imageId}
    
        const res = await fetch ("http://localhost:8000/api/blogs/"+params.id, {
          method: "PUT",
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(newData)
        });
    
        toast("blog updated successfully");
    
        navigate('/')
      }

      useEffect(() => {
        fetchBlog();
      })
      
  return (
    <div>
      <div className="container">
      <div className="d-flex justify-content-between pt-5">
        <h4>Edit Blog</h4>
        <a href="/" className='btn btn-dark'>back</a>
      </div>
      <div className="card border-0 shadow-lg p-3">
        <form onSubmit={ handleSubmit(formSubmit) }>
        <div className='card-body'>
        <div className="mb-3">
            <label htmlFor="" className='form-label'>Title</label>
            <input {...register('title', {required:true})} type="text" className={`form-control ${errors.title & 'is-invalid'}`} placeholder='title' />
            {errors.title && <p className='invalid-feedback'>Title field is required</p>}
        </div>
        <div className="mb-3">
            <label htmlFor="" className='form-label'>Short description</label>
            <textarea {...register('shortDesc')} name="" id="" cols="30" rows="5" className='form-control'></textarea>
        </div>
        <div className="mb-3">
            <label htmlFor="" className='form-label'>Description</label>
            {/* <textarea className="form-control" name="" id="" cols="30" rows="10"></textarea> */}
            <Editor value={html} onChange={onChange} containerProps={{ style: { height: '400px' } }} />
        </div>
        <div className="mb-3">
            <label htmlFor="" className='form-label'>Image</label><br />
            <input onChange={handleFileChange} type="file" />
            <div className='mt-3'>
                {
                    (blog.image) && <img className='w-100' src={`http://localhost:8000/api/blogs/${blog.image}`} />
                }
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="" className='form-label'>Author</label>
            <input {...register('author', {required: true})} type="text" className={`form-control ${errors.author & 'is-invalid'}`} placeholder='author' />
            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
        </div>
        <button className='btn btn-dark'>Update</button>
      </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default EditBlog
