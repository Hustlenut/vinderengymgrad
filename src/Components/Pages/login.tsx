import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import ILoginCredentials from "../Services/Interfaces/ILoginCredentials";
import POSTLoginCredentials from "../Services/HTTPrequests/POST/POSTLoginCredentials";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a JSON object with the email and password
    const data: ILoginCredentials = {
      email: email,
      password: password
    }

    const role = await POSTLoginCredentials(data);
    //The moment the method above returns, authProvider will be updated.
    if (role !== undefined) {
      setUserRole(role);

      if(userRole === "Admin") {
        navigate("/admin");
        window.location.reload(); //Because AuthProvider is one re-render away from showing the page.
        console.log("Success!!");
      }else if(userRole === "Student") {
        navigate("/student");
        window.location.reload();
      }
    } else {
      console.log("No user roles were found!")
    }
   
  };

  return (
    <>
      <div className="background">
        <form onSubmit={handleSubmit} className="flex-container">
          <h2>Logg inn med din e-post</h2>
          <div className="flex-item">
            <h4 style={{ marginBottom: "-0.1em" }}>E-post</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex-item">
            <h4 style={{ marginBottom: "-0.1em" }}>Passord</h4>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex-item">
            <button type="submit" className="loginBtn">
              Fortsett
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export { Login };
