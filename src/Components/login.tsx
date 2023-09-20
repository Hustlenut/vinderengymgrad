import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a JSON object with the email and password
    const data = {
      email: email,
      password: password
    };

    try {
      const response = await fetch("https://localhost:7070/api/Auth/Login", {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), //converts JS object to
      });

      if (response.ok) {
        // Handle a successful response (e.g., redirect or display a success message)
        console.log("Success!!");
        const responseBody = await response.json(); //To obtain the JS object
        const token = responseBody.token;

        localStorage.setItem('authToken', token);

        const decodedToken = JSON.parse(atob(token.split('.')[1])); //Another parsing is required, since the token itself is in JSON format
        const userRole = decodedToken.roles;
        //TODO: Restrict access through direct access to /admin 
        if(userRole === "Admin") {
            navigate('/admin');
        }else {
            navigate('/Login');
        }
        
        
      } else {
        // Handle errors (e.g., display an error message)
      }
    } catch (error) {
      // Handle network errors or other issues
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
