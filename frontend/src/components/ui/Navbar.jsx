import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { auth } from "../services/firebase";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold hover:text-gray-200">VR Learning</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
          {!user ? (
            <>
              <li><Link to="/login" className="text-white hover:text-gray-200">Login</Link></li>
              <li><Link to="/register" className="text-white hover:text-gray-200">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link></li>
              <li><Link to="/scenario-library" className="text-white hover:text-gray-200">Scenarios</Link></li>
              <li><Link to="/user-profile" className="text-white hover:text-gray-200">Profile</Link></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;