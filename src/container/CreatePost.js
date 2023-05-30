import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { HiNewspaper } from 'react-icons/hi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createAction } from '../store/actions/PostActions';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { REMOVE_ERRORS } from '../store/Types/postTypes';

const CreatePost = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const [value, setValue] = useState('');
  const [state, setState] = useState({
    title : "",
    description : "",
    image : ""
  });
  const [slug, setSlug] = useState("");
  const [slugBtn, setSlugBtn] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  
  // Getting current user name and _id for further operation.
  const { user : { fullName, _id } } = useSelector(state => state.AuthReducer);
  const { createErrors = [], redirect } = useSelector(state => state.PostReducer);
  
  // Function to handle slug
  const handleSlug = (e) =>
  {
    setSlugBtn(true);
    setSlug(e.target.value);
  }
  
  const handleUrl = (e) =>
  {
    e.preventDefault();
    setSlug(slug.trim().split(" ").join("-")); 
    setSlugBtn(false);
  }
  
  const handleInputs = (e) =>
  {
    setState({
        ...state,
        [e.target.name] : e.target.value,
    });
    
    const createSlug = e.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
  }
  
  
  const handleFiles = (e) => {
    setCurrentImage(e.target.files[0].name);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
        setImagePreview(reader.result);
    }
    setState({
        ...state,
        [e.target.name] : e.target.files[0]
    })
  }
  
  const handleDescription = (e) => {
    setState({
        ...state,
        [e.target.name] : e.target.value
    });
  }
  
  // Creating new post
  const createPost = (e) => {
    e.preventDefault();
    if(createErrors.length > 0 )
    {
        toast.error(createErrors[0].msg, { duration : 2000 });
    }
    const {title, description, image} = state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("body", value);
    formData.append("image", image);
    formData.append("slug", slug);
    formData.append("name", fullName);
    formData.append("id", _id);
    dispatch(createAction(formData));
  }
  
  useEffect(() => {
        if(redirect)
        {
            navigate("/dashboard");
        }
  }, [redirect]);
    
  return (
    <div className='create-container'>
        <Helmet>
            <title>Create new post</title>
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
                    <h3><HiNewspaper className='me-2' />Create a new post</h3>
                    <form action="">
                        <div className="group create">
                            <input 
                                type="text" 
                                name='title'
                                id='title'
                                value={state.title}
                                className='group-control'
                                placeholder='Post Title ...' 
                                onChange={handleInputs} 
                            />
                        </div>
                        <div className="group mt-5">
                            <label htmlFor="image" className='image_label'><i class="fa fa-upload me-2"></i>{currentImage}</label>
                            <input 
                                type="file" 
                                name='image'
                                id='image'
                                className='group-control' 
                                onChange={handleFiles}
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
                                rows="4"
                                placeholder='Enter meta description...'
                                onChange={handleDescription}
                            >
                            </textarea>
                        </div>
                    </form>
                </div> 
            </div>
            <div className="form-container">
                <div className="form-card">
                    <form action="" onSubmit={createPost}>
                        <div className="group">
                        <label htmlFor="slug">Post URL</label>
                            <input 
                                type="text" 
                                name='slug'
                                id='slug'
                                value={slug}
                                className='group-control'
                                onChange={handleSlug}
                                placeholder='Post Url ...' 
                            />
                        </div>
                        <div className="group_submit mt-2" style={{ width : "100%", textAlign : "end" }}>
                           
                            {
                                slugBtn ?
                                <input 
                                    type="submit" 
                                    className = "primary-btn"
                                    name='submit'
                                    id='submit'
                                    value={'Update Slug'}
                                    onClick={handleUrl}
                                    style={{ borderRadius : ".5rem", padding : ".75rem 2rem", width : "fit-content", fontSize : "1.25rem", fontWeight : "600" }}
                                /> :
                                null
                            }
                        </div>
                        <div className="group mt-5">
                            <label htmlFor="image">Post Image</label>
                            <div className="img_container">
                                { imagePreview ? <img src={imagePreview} alt='postImage' style={{ borderRadius : ".25rem" }} /> : 
                                <div style=
                                {{  color : "#777", 
                                    fontSize : "1rem", 
                                    fontWeight : "500", 
                                    textTransform : "none", 
                                    backgroundColor : "#f1f2f6", 
                                    width : "fit-content", 
                                    padding : ".8rem 1.5rem", 
                                    borderRadius : ".25rem" }}>
                                    Selected image goes here ...</div> }
                            </div>
                        </div>
                        <div className="group_submit mt-5">
                                <input 
                                    type="submit" 
                                    className = "primary-btn"
                                    name='submit'
                                    id='submit'
                                    value={'CREATE POST'}
                                    style={{ borderRadius : ".5rem", padding : "1.25rem", width : "100%", fontSize : "1.47rem", fontWeight : "600" }}
                                />
                        </div>
                    </form>
                </div> 
            </div>
        </div>
        </section>
    </div>
  )
}

export default CreatePost