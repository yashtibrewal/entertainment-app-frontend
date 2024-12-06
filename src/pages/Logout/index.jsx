import { useEffect } from "react";
import { useAuth } from "../../store/auth"
import logoutUserApi from "./api";
import { useNavigate } from "react-router-dom";


function Logout() {

  const { logout, state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const result = await logoutUserApi();
      if (!result.isSuccess) {
       console.error(result);
      }  
      logout();
      navigate("/login");
      
    };

    logoutUser();
  }, [logout, navigate, state.token]);

  return (
    <div>
      Logging out.
    </div>
  )

}

export default Logout;