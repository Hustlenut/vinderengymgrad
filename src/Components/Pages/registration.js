import React from "react";
import "./registration.css";

function Registration() {
  return (
    <>
      <div className="background">
        <iframe
          title="graderingskjema"
          src="https://docs.google.com/forms/d/e/1FAIpQLSfexS6gOXK5UDItTWoxAWe0JOfu_66QRWTllFG7B0ZWmCUgXA/viewform?embedded=true"
          height="667px"
          width="375px"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          className="fill-out"
        >
          Loading…
        </iframe>
      </div>
    </>
  );
}

export default Registration;
