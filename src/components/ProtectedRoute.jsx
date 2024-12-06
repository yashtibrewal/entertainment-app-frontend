import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useEffect } from 'react';
import { tokens } from '../store/localstorage';

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const { state } = useAuth();

  useEffect(() => {
    if (!tokens.entertainmentAppToken ||
        !tokens.tmdbToken)
      navigate("/login")
      else {
        navigate("/");
      }
  },[tokens.entertainmentAppToken, tokens.tmdbToken])

  return state.isLoggedIn ? <Outlet></Outlet> : navigate("/login");
};

export default ProtectedRoute;
