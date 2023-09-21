import "./navbar.css";
import { Link } from "react-router-dom";
import Logo from "./theLogo";

export default function Navbar () {
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
                  <li>
                    <Link to="/login">Logg inn</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
    
        </>
      );
}