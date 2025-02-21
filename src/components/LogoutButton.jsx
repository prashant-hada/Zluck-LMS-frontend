import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLogout } from "../services/mutation"; // Import the mutation hook

const LogoutButton = ({ style = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: logoutUser, isLoading } = useLogout(); // Call the mutation

  const handleLogout = () => {
    logoutUser(null, {
      onSuccess: () => {
        dispatch(logout()); // Only dispatch Redux action after successful API response
        navigate("/login");
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={`${style} py-1 px-4 text-white text-xl font-semibold bg-purple-500 rounded-lg`}
      disabled={isLoading} // Disable button while logging out
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

LogoutButton.propTypes = {
  style: PropTypes.string,
};

export default LogoutButton;
