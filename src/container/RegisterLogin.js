import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import rocket from '../images/rocket.svg'
import desk from '../images/desk.svg'
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, registerAction } from '../store/actions/AuthActions';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from "rsuite";

const RegisterLogin = (props) => {

  const { loading, registerErrors = [], user, loginErrors = [] } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const [userDetails, setUserDetails] = useState({
    firstName : "",
    lastName : "",
    contactNumber : null,
    email : "",
    password : ""
  });

  const [loginDetails, setLoginDetails] = useState({
    email : "",
    password : ""
  });

  useEffect(() => {

      const regBtn = document.getElementById("regBtn");
      const logBtn = document.getElementById("logBtn");
      const container = document.querySelector(".container");

      regBtn.onclick = () => {
        container.classList.add("register-mode");
      };

      logBtn.onclick = () => {
        container.classList.remove("register-mode");
      };

  }, []);

  useEffect(() => {
    
    if(errors === "Register")
    {
      if(registerErrors.length > 0 )
      {
        toast.error(registerErrors[0].msg, { duration : 2000 });
      }
    }
    else if(errors === "Login")
    {
      if(loginErrors.length > 0)
      {
        toast.error(loginErrors[0].msg, { duration : 2000, onClose : () => {
          console.log("closed");
        } });
      }
    }
      
      if(user)
      {
        console.log(user);
        navigate("/dashboard");
      }

  }, [errors, loginErrors, navigate, registerErrors, user]);

  // Function to handle the inputs.
  const handleInputs = (e) => {
      setUserDetails({
        ...userDetails,
        [e.target.name] : e.target.value   // [firstName] : Chaitanya (Square bracket allows variable as key name);
      });
  }

  const handleLoginInputs = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name] : e.target.value
    });
  }

  // When user clicks on register.
  const userRegister = async (e) => {
      e.preventDefault();
      dispatch(registerAction(userDetails));
      setErrors("Register");
  }

  // When user wants to login.
  const userLogin = async (e) => {
    e.preventDefault();
    dispatch(loginAction(loginDetails));
    setErrors("Login");
  }


  return (
    <Layout>
    <Helmet>
        <title>SignUp | SignIn</title>
        <meta name="description" content="CPWEATHER : Register / Login " />
    </Helmet>
      <div className="container">
        <div className="forms-container">
          <div className="register-login">
          <Toaster
            position='top-center'
            reverseOrder = "false"
            toastOptions={{
              style: {
                fontSize : "1.25rem",
                fontWeight : "700",
              },
            }}
          />
            <form action="" className="register-form" onSubmit = {userRegister}>
              <h2 className="title">	<i class="fa fa-user" style={{ marginRight: "6px" }}></i>Register</h2>

              <div className="input-field">
                <i className="fas fa-user-circle"></i>
                <input
                    type="text"
                    placeholder='First Name'
                    name='firstName'
                    value = {userDetails.firstName}
                    onChange = { handleInputs }
                  />
              </div>

              <div className="input-field">
                <i className="fas fa-user-circle"></i>
                <input
                    type="text"
                    placeholder='Last Name'
                    name='lastName'
                    value = {userDetails.lastName}
                    onChange = { handleInputs }
                />
              </div>

              <div className="input-field">
                <i className="fas fa-mobile"></i>
                <input
                    type="number"
                    placeholder='Contact No'
                    name='contactNumber'
                    value = {userDetails.contactNumber}
                    onChange = { handleInputs }
                />
              </div>

              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    value = {userDetails.email}
                    onChange = { handleInputs }
                />
              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    value = {userDetails.password}
                    onChange = { handleInputs }
                />
              </div>

              <input
                  type="submit"
                  value = { loading ? "..." : "Register" }
                  className='primary-btn'
              />

              <p className="social-text">Or Sign up with social platforms</p>

              <div className="social-media">
                <Link to={'#'} className="social-icon">
                  <i className="fab fa-facebook"></i>
                </Link>
                <Link to={'#'} className="social-icon">
                  <i className="fab fa-google"></i>
                </Link>
                <Link to={'#'} className="social-icon">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to={'#'} className="social-icon">
                  <i className="fab fa-linkedin"></i>
                </Link>
              </div>

            </form>

            <form action="" className="login-form" onSubmit={userLogin}>
              <h2 className="title"><i class="fa fa-sign-in" style={{ marginRight: "5.5px" }}></i>Login</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder='Email'
                  name='email'
                  value={loginDetails.email}
                  onChange={ handleLoginInputs }
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder='Password'
                  name='password'
                  value={loginDetails.password}
                  onChange={ handleLoginInputs }
                />
              </div>
              <input
                type="submit"
                value= { loading ? "..." : 'Login' }
                className='primary-btn'
              />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <Link to={'#'} className="social-icon">
                  <i className="fab fa-facebook"></i>
                </Link>
                <Link to={'#'} className="social-icon">
                  <i className="fab fa-google"></i>
                </Link>
                <Link to={'#'} className="social-icon">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to={'#'} className="social-icon">
                  <i className="fab fa-linkedin"></i>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">

          <div className="panel left-panel">
            <div className="content">
              <h3>Now here !</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                cum odio voluptas officiis dolore itaque.</p>
                <button className='primary-btn transparent' id='regBtn'>Register</button>
            </div>
            <img src={rocket} alt="" className='image'/>
          </div>


          <div className="panel right-panel">
            <div className="content">
              <h3>Now here !</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                cum odio voluptas officiis dolore itaque.</p>
                <button className='primary-btn transparent' id='logBtn'>Login</button>
            </div>
            <img src={desk} alt="" className='image'/>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default RegisterLogin
