import { useEffect } from "react";
import { useAuth } from "../../store/auth";
import logoutUserApi from "./api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ToastContext"; 

function Logout() {
  const { logout, state } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast(); 

  useEffect(() => {
    const logoutUser = async () => {
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
