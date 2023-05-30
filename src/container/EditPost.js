import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Toaster, toast } from 'react-hot-toast'
import { HiPencilAlt } from 'react-icons/hi'
import ReactQuill from 'react-quill'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPostByIdAction, updatePostAction } from '../store/actions/PostActions'
import { POST_RESET, RESET_UPDATE_ERRORS } from '../store/Types/postTypes'
import Loader from "../components/Loader";

const EditPost = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, postStatus } = useSelector(state => state.FetchPostByIdReducer);
  const { redirect, loading } = useSelector(state => state.PostReducer);
  const { editErrors } = useSelector(state => state.UpdatePostReducer);
  const { id } = useParams();
  const [state, setState] = useState({ 
    title : "",
    description : ""
   });
   const [value, setValue] = useState("");
   
   useEffect(() => {
    if(redirect === true)
    {
        navigate("/dashboard");
    }
   }, [redirect]);
   
   useEffect(() => {
    
    if(postStatus)
    {
        setState({
            title : post.title,
            description : post.description
        });
        setValue(post.body);
        dispatch({ type : POST_RESET });
    }
    else
    {
        dispatch(fetchPostByIdAction(id));
    }
    
   }, [post]);
   
   
   // Define function to call after submit
   const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePostAction({
            title : state.title,
            body : value,
            description : state.description,
            id : post._id
        }));
        if(!loading)
        {
            if(editErrors.length !== 0)
            {
                toast.error(editErrors[0].msg);
                dispatch({ type : RESET_UPDATE_ERRORS });
            }
        }
   }
    
  return !loading ?  (
   <div className='create-container'>
        <Helmet>
            <title>Edit Post</title>
            <meta name="description" content="CPWeather Blogs !!" />
        </Helmet>
        <section>
            <div className="row">
                <Toaster
                    position='top-center'
                    reverseOrder = "false"
                    toastOptions={{
                    style: {
                        fontSize : "1.25rem",
                        fontWeight : "700",
                        marginTop : "110px"
                    },
                    }}
                />
                <div className="form-container">
                    <div className="form-card">
                        <h3><HiPencilAlt className='me-2' />Edit post</h3>
                        <form action="" onSubmit={handleOnSubmit}>
                            <div className="group create">
                                <input 
                                    type="text" 
                                    name='title'
                                    id='title'
                                    value={state.title}
                                    className='group-control'
                                    placeholder='Post Title ...' 
                                    onChange={(e) => { setState({...state, title : e.target.value }) }} 
                                />
                            </div>
                            <div className="group mt-4">
                                <label htmlFor="body" style={{ fontWeight : "normal" }}>
                                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                                </label>
                            </div>
                            <div className="group mt-4">
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    cols="auto" 
                                    value={state.description}
                                    rows="4"
                                    placeholder='Enter meta description...'
                                    onChange={(e) => { setState({ ...state, description : e.target.value }) }}
                                >
                                </textarea>
                            </div>
                            <div className="group_submit mt-5">
                                    <input 
                                        type="submit" 
                                        className = "primary-btn"
                                        name='submit'
                                        id='submit'
                                        value={'UPDATE POST'}
                                        style={{ borderRadius : ".5rem", padding : "1.25rem", width : "100%", fontSize : "1.47rem", fontWeight : "600" }}
                                    />
                            </div>
                        </form>
                    </div>   
                </div>
            </div>
        </section>
    </div> 
  ) : <Loader />
}

export default EditPost