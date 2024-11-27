import { createContext, useContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
// Action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Helper function to extract user from jwt token
function getUserFromToken(entertainmentAppToken) {
  if (!entertainmentAppToken) return null;
  const decodedObj = jwtDecode(entertainmentAppToken);
  const user = {
    name: decodedObj.name,
    role: decodedObj.role,
    email: decodedObj.email,
    id: decodedObj.id,
  };
  return user;
};

const entertainmentAppToken = localStorage.getItem('entertainmentAppToken');
const tmdbToken = localStorage.getItem('tmdbToken');

const initialState = {
  entertainmentAppToken: entertainmentAppToken || null,
  tmdbToken: tmdbToken || null,
  user: getUserFromToken(entertainmentAppToken),
  isLoggedIn: !!entertainmentAppToken,
};


// Auth reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      const user = getUserFromToken(action.payload.entertainmentAppToken);
      localStorage.setItem('tmdbToken', action.payload.entertainmentAppToken);
      localStorage.setItem('entertainmentAppToken', action.payload.entertainmentAppToken);
      return {
        entertainmentAppToken: action.payload.entertainmentAppToken,
        tmdbToken: action.payload.tmdbToken,
        isLoggedIn: true,
        user: user,
      };

    case LOGOUT:
      localStorage.clear();
      return {
        entertainmentAppToken: null,
        tmdbToken: null,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (result) => {
    try {
      dispatch({
        type: LOGIN,
        payload: {
          entertainmentAppToken: result.entertainmentAppToken,
          tmdbToken: result.entertainmentAppToken
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    dispatch({ type: LOGOUT })
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}