import { useEffect, useRef } from "react";
import { useAuth } from "../../store/auth";
import logoutUserApi from "./api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ToastContext";

function Logout() {
  const { logout, state } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast(); 
  const hasLoggedOut = useRef(false); //using ref hook to check logout state

  useEffect(() => {
    const logoutUser = async () => {
      if (hasLoggedOut.current) return; // if it is true it simply returns ;
      hasLoggedOut.current = true;

      try {
        const result = await logoutUserApi();
        if (result.isSuccess) {
          addToast("Logged out successfully!", "success");
        } else {
          addToast(result.message || "Logout failed. Please try again.", "error"); 
        }
      } catch (error) {
        console.error(error);
        addToast("An unexpected error occurred during logout.", "error"); 
      } finally {
        logout();
        navigate("/login");
      }
    };

    logoutUser();
  }, [logout, navigate, state.token, addToast]);

  return null; 
}

export default Logout;
