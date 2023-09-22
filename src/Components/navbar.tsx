import "./navbar.css";
import { Link } from "react-router-dom";
import Logo from "./theLogo";
import { useAuth } from "./authProvider";

export default function Navbar() {
  const user = useAuth();

  const navigateToVinderen = () => {
    window.location.href = "https://vinderengym.no/";
  };

  return (
    <>
      <div className="grid vinderen-BG">
        <div>
          <button onClick={navigateToVinderen} className="logo">
            {<Logo />}
          </button>
        </div>

        <div className="nav-container">
          <nav>
            <ul>
              <li>
                <Link to="/registration">Registrering</Link>
              </li>
              {/* Conditionally render the "Logg inn" link based on the user value */}
              {(user === "Admin") ? (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              ) : 
              (               
              <li>
                <Link to="/login">Logg inn</Link>
              </li>)}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
