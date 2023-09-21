import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar";
import ProtectedRoute from "./Components/protectedRoute";
import Admin from "./Components/Pages/admin";
import { Login } from "./Components/Pages/login";
import Registration from "./Components/Pages/registration";

function App() {
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
            <Route
              path="admin"
              element={
                <ProtectedRoute user={<Admin />} redirectPath={""}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="registration" element={<Registration />} />
            <Route path="*" element={<h1>Error 404...</h1>} />
          </Routes>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
