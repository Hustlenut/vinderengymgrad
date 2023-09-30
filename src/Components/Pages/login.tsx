import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import ILoginCredentials from "../Services/Interfaces/ILoginCredentials";
import POSTLoginCredentials from "../Services/HTTPrequests/POST/POSTLoginCredentials";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Create a JSON object with the email and password
    const data: ILoginCredentials = {
      email: email,
      password: password,
    };
    //!!! This cannot be async!
    const rolePromise = POSTLoginCredentials(data);

    rolePromise
      .then((role: string) => {
        //The method will "resolve" a role from the promise
        if (role === "Admin") {
          navigate("/admin");
          window.location.reload();
          console.log("Success!!");
        } else if (role === "Student") {
          navigate("/student");
        }
      })
      .catch((error: any) => {//Catches any returned reject() so far.
        console.log("asdf " + error);
        if (error && error.errors) {
          console.log("Incorrect credentials");
          setErrorMessage(error.errors.join(", ")); // Set the error message from the server response
        } else {
          setErrorMessage("An unexpected error occurred.");
          console.error("Login failed", error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="background">
        <form onSubmit={handleSubmit} className="flex-container">
          <h2>Logg inn med din e-post</h2>
          <h5 style={{ color: "GrayText" }}>
            Midlertidig kun for administratorer
          </h5>

          {/* Conditional rendering based on isLoading state */}
          {isLoading ? ( // Render Loading text when isLoading is true
            <div>
              <h2>Laster...</h2>
            </div>
          ) : (
            <>
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
                {errorMessage && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {errorMessage}
                  </div> // Render error message if it exists
                )}
                <button type="submit" className="loginBtn">
                  Fortsett
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export { Login };
