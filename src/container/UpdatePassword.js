import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Toaster, toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { updatePasswordAction } from '../store/actions/ProfileActions'
import { RESET_UPDATE_NAME_ERRORS, RESET_UPDATE_PASSWORD_ERRORS } from '../store/Types/profiletypes'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'rsuite'

const UpdatePassword = () => {
  
  const { user : {  _id } } = useSelector(state => state.AuthReducer);
  const { loading, redirect } = useSelector(state => state.PostReducer);
  const [currentPassword, setCurrentPassword] = useState("");  
  const [newPassword, setNewPassword] = useState("");  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updatePasswordErrors = [] } = useSelector(state => state.updateNameReducer);
  
  useEffect(() => {
    if(redirect)
    {
        navigate("/dashboard");
    }
  }, [redirect]);
  
  useEffect(() => {
    if(updatePasswordErrors.length !== 0)
      {
          toast.error(updatePasswordErrors[0].msg);
          dispatch({ type : RESET_UPDATE_PASSWORD_ERRORS });
      }
  }, [updatePasswordErrors]);
  
  const updatePasswordMethod = (e) => {
      e.preventDefault();
      
      dispatch(updatePasswordAction({  currentPassword, newPassword, userId : _id }));
  }
    
  return !loading ? (
    <Layout>
        <div className="dashboard-container">
            <Helmet>
                <title>Update Password</title>
                <meta name="description" content="CPWEATHER Blogs !" />
            </Helmet>
            <section className="dashboard-section">
                <div className="row">
                    <div className="settings">
                        <Sidebar />
                    </div>
                    <div className="posts-container updateName">
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
                        <div className="form-card">
                            <form action="" onSubmit={updatePasswordMethod}>
                                <div className="img-container">
                                    <img src={require("../images/password.png")} alt="password" />
                                </div>
                                <div className="group create">
                                    <input 
                                        type="password" 
                                        name='current_password'
                                        id='current_password'
                                        value={currentPassword}
                                        className='group-control'
                                        placeholder='Current Password.' 
                                        onChange={(e) => setCurrentPassword(e.target.value)} 
                                    />
                                </div>
                                <div className="group create">
                                    <input 
                                        type="password" 
                                        name='title'
                                        id='title'
                                        value={newPassword}
                                        className='group-control'
                                        placeholder='New Password' 
                                        onChange={(e) => setNewPassword(e.target.value)} 
                                    />
                                </div>
                                <div className="group_submit mt-5">
                                    <input 
                                        type="submit" 
                                        className = "primary-btn"
                                        name='submit'
                                        id='submit'
                                        value={'UPDATE PASSWORD'}
                                        style={{ borderRadius : ".5rem", padding : "1.25rem", width : "100%", fontSize : "1.3rem", fontWeight : "700" }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Layout>
  ) : <Loader />
}

export default UpdatePassword