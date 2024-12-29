import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({
  title = "Oops! Something went wrong",
  message = "We're sorry, but we encountered an unexpected error.",
  errorCode = "500",
}) => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="text-center bg-white p-5 rounded-3 shadow-lg">
        <div className="mb-5">
          <h1 className="display-1 fw-bold text-danger mb-0">{errorCode}</h1>
          <div
            className="border-bottom border-2 border-danger mx-auto mt-2"
            style={{ width: "60px" }}
          ></div>
        </div>

        <div className="mb-5">
          <h2 className="h3 mb-3 text-dark">{title}</h2>
          <p className="text-muted">{message}</p>
        </div>

        <Link
          to="/"
          className="btn btn-danger btn-lg px-5 rounded-pill shadow-sm hover-shadow-lg"
        >
          Return to Login Page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
