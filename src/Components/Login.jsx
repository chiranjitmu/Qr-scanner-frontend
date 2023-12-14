import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const emailSchema = yup
  .string()
  .required("Please Enter Your Email")
  .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Please Enter Valid Email");

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setemailError] = useState(false);
  const [passworderror, setpasswordError] = useState(false);
  const navigate = useNavigate();

  const validate = async () => {
    try {
      await emailSchema.validate(email);
      handleLogin();
    } catch (error) {
      alert(error.message);
      setemailError(true);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_BASE_URI
        }/api/v1/login?email=${email}&password=${password}`
      );

      const success = await response.json();

      if (success.message === "Login successful") {
        setEmail("");
        setPassword("");
        alert(success.message);
        localStorage.setItem("jwtToken", success.token);
        localStorage.setItem("email", success.email);
        const navigatetime = setTimeout(() => {
          navigate("/home");
        }, 2000);
        return () => clearTimeout(navigatetime);
      } else if (success.message === "Invalid email") {
        setEmail("");
        setPassword("");
        setemailError(true);
        alert(success.message);
      } else if (success.message === "Invalid password") {
        setEmail("");
        setPassword("");
        setpasswordError(true);
        alert(success.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="fixed bg-whatsappbg  w-full h-full flex items-center justify-center">
      <div className="container bg-white p-6 m-10 rounded-xl sm:m-14 sm:p-10 md:p-14 md:m-16 lg:p-20 xl:p-24 xl:m-72">
        <h1 className="font-serif text-xl text-center md:text-2xl lg:text-3xl xl:text-4xl mb-6">
          Welcome to QR-scanner
        </h1>
        <form className="space-y-4">
          <input
            className={`${
              emailerror ? "border-red-700" : "border-gray-300"
            } p-2 border w-full focus:border-blue-500 focus:outline-none rounded`}
            type="email"
            placeholder="Email"
            value={email}
            required
            onClick={() => {
              setemailError(false);
            }}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className={`${
              passworderror ? "border-red-700" : "border-gray-300"
            } p-2 border w-full focus:border-blue-500 focus:outline-none rounded`}
            type="password"
            placeholder="Password"
            value={password}
            required
            onClick={() => {
              setpasswordError(false);
            }}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            className="bg-lime-200 rounded cursor-pointer hover:bg-lime-300 p-2 w-full"
            type="button"
            value="Login"
            onClick={validate}
          />
        </form>
        <span className="text-sm flex justify-center pt-2 pb-2">OR</span>
        <div className="flex justify-center">
          Don't Have an account?
          <a href="/register">
            <span className="text-gray-500 ml-2">Register</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
