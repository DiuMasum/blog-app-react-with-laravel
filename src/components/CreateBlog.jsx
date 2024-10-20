import React from 'react'
import Editor from 'react-simple-wysiwyg';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const [html, setHtml] = useState('');

  const navigate = useNavigate();

  function onChange(e) {
    setHtml(e.target.value);
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const formSubmit = async (data) => {
    const newData = {...data, "description": html}

    const res = await fetch ("http://localhost:8000/api/blogs", {
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(newData)
    });

    toast("blog added successfully");

    navigate('/')
  }

  return (
    <div>
      <div className="container">
      <div className="d-flex justify-content-between pt-5">
        <h4>Create Blog</h4>
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
            <input type="file" />
        </div>
        <div className="mb-3">
            <label htmlFor="" className='form-label'>Author</label>
            <input {...register('author', {required: true})} type="text" className={`form-control ${errors.author & 'is-invalid'}`} placeholder='author' />
            {errors.author && <p className='invalid-feedback'>Author field is required</p>}
        </div>
        <button className='btn btn-dark'>Create</button>
      </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default CreateBlog
