import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Toaster, toast } from 'react-hot-toast'
import { BsImages } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePostImageAction } from "../store/actions/PostActions";
import { RESET_UPDATE_IMAGE_ERRORS } from "../store/Types/postTypes";

const EditImage = () => {
    
    const [state, setState] = useState({
        image : "",
        imagePreview : "",
        imageName : "Choose Image"
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, redirect } = useSelector(state => state.PostReducer);
    const { editImageErrors } = useSelector(state => state.UpdatePostImageReducer);
    
    
    // Get the id of post using parameter in url.
    const { id } = useParams();
    
    const handleFiles = (e) => {
        if(e.target.files.length !== 0)
        {
            setState({ 
                ...state, 
                image : e.target.files[0],
                imageName : e.target.files[0].name,
            });
            
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                setState({ 
                    ...state, 
                    imagePreview : reader.result,
                    image : e.target.files[0],
                    imageName : e.target.files[0].name,
                });
            }
        }
    }
    
    useEffect(() => {
        if(redirect)
        {
            navigate("/dashboard");
        }
  }, [redirect]);
    
    const updateImage = (e) =>
    {
        if(editImageErrors.length !== 0)
        {
            toast.error(editImageErrors[0].msg);
            dispatch({ type : RESET_UPDATE_IMAGE_ERRORS });
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", id);
        formData.append("image", state.image);
        dispatch(updatePostImageAction(formData));
    }
    
    return(
        <div className='create-container'>
        <Helmet>
            <title>Update Post Image</title>
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
                        <h3><BsImages className='me-2' />Update image</h3>
                        <form action="" onSubmit={updateImage}>
                        <div className="group mt-5">
                            <label htmlFor="image" className='image_label'><i class="fa fa-upload me-2"></i>{state.imageName}</label>
                            <input 
                                type="file" 
                                name='image'
                                id='image'
                                className='group-control' 
                                onChange={handleFiles}
                            />
                        </div>
                            <div className="group mt-5">
                            <div className="img_container">
                                { state.imagePreview ? <img src={state.imagePreview} alt='postImage' style={{ borderRadius : ".25rem" }} /> : 
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
                                        value={'UPDATE IMAGE'}
                                        style={{ borderRadius : ".5rem", padding : "1.25rem", width : "100%", fontSize : "1.3rem", fontWeight : "700" }}
                                    />
                            </div>
                        </form>
                    </div>   
                </div>
                <div className="form-container" style={{ background : 'transparent' }}>
                    
                </div>
            </div>
        </section>
    </div> 
    )
}

export default EditImage;