import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom";
import Navbar from "./Components/navbar";
import Admin from "./Components/Pages/admin";
import { Login } from "./Components/Pages/login";
import Registration from "./Components/Pages/registration";
import {  useAuth } from "./Components/authProvider";

function App() {
  const auth = useAuth();

  return (
    <>
        <header>
          <Navbar />
        </header>
        <main>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/registration" />} />
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
              <Route path="admin" element={auth === "Admin" ? <Admin /> : <Navigate to="admin" />} />
              <Route path="*" element={<h1>Error 404...</h1>} />
            </Routes>
          </div>
        </main>
        <footer></footer>
    </>
  );
}

export default App;
