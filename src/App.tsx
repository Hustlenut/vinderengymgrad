import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Registration from "./Components/registration";
import Logo from "./Components/theLogo";

function App() {
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
              {/*<li>
                <Link to="/other">Annet</Link>
              </li>*/}
            </ul>
          </nav>
        </div>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/registration" />} />
          {/*<Route path="other" element={<h1>Hello other</h1>} />*/}
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<h1>Error 404...</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
