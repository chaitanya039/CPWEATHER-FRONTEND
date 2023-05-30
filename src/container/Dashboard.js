import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_LOADER, REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, SET_MESSAGE } from '../store/Types/postTypes';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { fetchPostsAction } from '../store/actions/PostActions';
import { Link, useParams } from 'react-router-dom';
import { BsFillArchiveFill, BsFillPencilFill, BsImage } from "react-icons/bs";
import { FaLaptopHouse } from "react-icons/fa";
import Loader from "../components/Loader";
import Sidebar from '../components/Sidebar';
import PostPagination from '../components/PostPagination';
import axios from "axios";
import moment from 'moment/moment';

const Dashboard = () => {
  
  const dispatch = useDispatch();
  const { redirect, message, loading } = useSelector(state => state.PostReducer);
  const { user : {_id}, token } = useSelector(state => state.AuthReducer);
  const { posts = [], count, perPage } = useSelector(state => state.FetchPostsReducer);
  let { page } = useParams();
  if(page === undefined)
  {
      page = 1;
  }
  
  const deletePost = async (id) => {
    const confirm = window.confirm("Are you sure to delete the post ?"); 
    if(confirm)
    {
      try
      {
        dispatch({ type : SET_LOADER });
        const config = {
          headers : {
              Authorization : `Bearer ${token}`
          }
        }
        
        const { data, data : { msg } } = await axios.get(`/post/delete/${id}`, config);
        if(data)
        {
          dispatch(fetchPostsAction(_id, page));
        }
        dispatch({ type : SET_MESSAGE, payload : msg });
        dispatch({ type : CLOSE_LOADER });
      }
      catch(error)
      {
        console.log(error);
        dispatch({ type : CLOSE_LOADER });
      }
    }
  }

  useEffect(() => {
    if(message)
    {
      toast.success(message);
      dispatch({ type : REMOVE_MESSAGE });
    }
    if(redirect)
    {
      dispatch({ type : REDIRECT_FALSE });
    }
  }, [message, redirect]);
  
  useEffect(() => {
    dispatch(fetchPostsAction(_id, page));
  }, [page]);
  
  return (
    <Layout>
    <div className="dashboard-container">
       <Helmet>
            <title>Blogs Dashboard</title>
            <meta name="description" content="Blogs Dashboard" />
        </Helmet>
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
        <section className="dashboard-section">
          <div className="row">
            <div className="settings">
                <Sidebar />
            </div>
            <div className="posts-container">
              {
                !loading 
                ? posts.length > 0
                ? posts.map((post) => (
                  <div className="dashboard__posts" key={posts._id}>
                    <div className="dashboard__posts__image">
                      <img src={require("../uploads/" + post.image) ? require("../uploads/" + post.image) : ""} alt="" />
                    </div>
                    <div className="dashboard__posts__title">
                      <Link to={"/"}>{ post.title }</Link>
                      <p>{post.description}</p>
                      <div><i class="fa fa-calendar me-2"></i>Published { moment(post.updatedAt).fromNow() }...</div>
                    </div>
                    <div className="dashboard__posts__operations">
                      <Link to={`/updateImage/${post._id}`} className='me-4'><BsImage className='icon' /></Link>
                      <Link to={`/edit/${post._id}`} className='me-4'> <BsFillPencilFill className='icon' /> </Link>
                      <Link to={"#"} className='' onClick={
                        () => {
                          deletePost(post._id);
                        }
                      }><BsFillArchiveFill className='icon' /></Link>
                    </div>
                  </div>
                ))
                : "You don't have any post !"
                : (
                  <Loader />
                )
              }
              <PostPagination page = {page} count = {count} perPage = { perPage } />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Dashboard;