import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
  const { user } = useSelector(state => state.AuthReducer)
  return user ? <Component /> : <Navigate to={'/register-login'} />;
}

export default PrivateRoute;