import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Toaster, toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { updateNameAction } from '../store/actions/ProfileActions'
import { RESET_UPDATE_NAME_ERRORS } from '../store/Types/profiletypes'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const UpdateName = () => {
  
  const { user : { firstName, lastName, _id } } = useSelector(state => state.AuthReducer);
  const { redirect, loading } = useSelector(state => state.PostReducer);
  const [userFirstName, setUserFirstName] = useState("");  
  const [userLastName, setUserLastName] = useState("");  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateNameErrors = [] } = useSelector(state => state.updateNameReducer);
  
  useEffect(() => {
    setUserFirstName(firstName);
    setUserLastName(lastName);
  }, []);
  
  useEffect(() => {
    if(redirect)
    {
        navigate("/dashboard");
    }
  }, [redirect]);
  
  useEffect(() => {
    
    if(updateNameErrors.length !== 0)
      {
          toast.error(updateNameErrors[0].msg);
          dispatch({ type : RESET_UPDATE_NAME_ERRORS });
      }
  }, [updateNameErrors]);
  
  const updateNameMethod = (e) => {
      e.preventDefault();
      
      dispatch(updateNameAction({ firstName : userFirstName, lastName : userLastName, id : _id }));
  }
    
  return !loading ? (
    <Layout>
        <div className="dashboard-container">
            <Helmet>
                <title>Update Username</title>
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
                            <form action="" onSubmit={updateNameMethod}>
                                <div className="img-container">
                                    <img src={require("../images/name.png")} alt="name" />
                                </div>
                                <div className="group create">
                                    <input 
                                        type="text" 
                                        name='title'
                                        id='title'
                                        value={userFirstName}
                                        className='group-control'
                                        placeholder='First Name' 
                                        onChange={(e) => setUserFirstName(e.target.value)} 
                                    />
                                </div>
                                <div className="group create">
                                    <input 
                                        type="text" 
                                        name='title'
                                        id='title'
                                        value={userLastName}
                                        className='group-control'
                                        placeholder='Last Name' 
                                        onChange={(e) => setUserLastName(e.target.value)} 
                                    />
                                </div>
                                <div className="group_submit mt-5">
                                    <input 
                                        type="submit" 
                                        className = "primary-btn"
                                        name='submit'
                                        id='submit'
                                        value={'UPDATE NAME'}
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

export default UpdateName