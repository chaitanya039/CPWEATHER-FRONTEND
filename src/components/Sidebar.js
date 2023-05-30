import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateProfilePicture } from "../store/actions/ProfileActions";
import { Toaster, toast } from "react-hot-toast";
import { RESET_UPDATE_PICTURE_ERRORS } from "../store/Types/profiletypes";

const Sidebar = () =>
{
   // const [userProfilePicture, setUserProfilePicture] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const { user : {profilePicture, _id} } = useSelector(state => state.AuthReducer);
    const { redirect } = useSelector(state => state.PostReducer);
    const { updatePictureErrors = [] } = useSelector(state => state.updateNameReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
      useEffect(() => {
        if(redirect)
        {
            navigate("/dashboard");
        }
      }, [redirect]);
      
      useEffect(() => {
        if(updatePictureErrors.length > 0 )
        {
            toast.error(updatePictureErrors[0].msg, { duration : 2000 });
            dispatch({ type : RESET_UPDATE_PICTURE_ERRORS });
        }
      }, [updatePictureErrors]);
      
      const handlePicture = (e) => 
      {
        //console.log(e.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        formData.append("userId", _id);
        dispatch(updateProfilePicture(formData));
      }
    
    return (
        <div className="sidebar">
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
            <div className="sidebar__element">
                <h3><i class="fa fa-cog me-2"></i>Settings</h3>
            </div>
            <div className="sidebar__element">
                <div className="upload">
                {   
                    !imagePreview ?
                    <img src={ profilePicture !== "" ? require("../uploads/" + profilePicture) : "" } alt="" /> :
                    <img src={ imagePreview } alt="" />
                }
                    
                    <div className="round">
                        <input 
                            type="file"
                            id="profilePicture"
                            name="profilePicture"     
                            onChange={handlePicture}                   
                         />
                       <i class="fa fa-camera-retro"></i>
                    </div>
                </div>
            </div>
            <div className="sidebar__element">
                <Link to={"/updatePassword"}><i class="fa fa-key me-4"></i>Change Password</Link>
            </div>
            <div className="sidebar__element">
                <Link to={"/updateName"}><i class="fa fa-user-circle me-4"></i>Change Name</Link>
            </div>
            <div className="sidebar__element">
                <Link className="blog-link" to={"/dashboard"}><i class="fa fa-newspaper-o me-4"></i>Your Blogs</Link>
            </div>
            
        </div>
    )
}

export default Sidebar;