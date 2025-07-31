import React, { useState } from "react";
import { validateSignupForm } from "../utils/validation";
import { registerUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  //  const [isLogin, setIsLogin] = useState(true)

  const [form, setForm] = useState({
    fName: "",
    lName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { valid, message } = validateSignupForm(form);
    if (!valid) {
      alert(message);
      return;
    }

    try {
      const response = await registerUser(form);
      alert("User created successfully!");
      console.log("Signup success:", response);
      navigate("/");

      setForm({
        fName: "",
        lName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err);
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="signup flex flex-col-reverse lg:flex-row-reverse justify-between w-full max-w-screen-lg h-auto lg:h-[85vh] border-2 border-amber-200 mx-auto mt-10 overflow-hidden rounded-4xl ">
      <div className="right bg-[url(./images/bg3.svg)] w-full lg:w-[50%] min-h-[40vh] bg-cover bg-no-repeat  bg-center flex items-center justify-center overflow-hidden bg-blend-darken bg-[var(--small-color)] "></div>

      <div className="left bg-[var(--secondary)] w-full lg:w-[50%] flex flex-col">
        <h2 className="text-[var(--primary)] text-2xl ml-6 mt-6 mb-4">
          Sign Up
        </h2>

        <form
          className="flex flex-col bg-[var(--text-color)] rounded-xl px-4 py-3 mx-6 text-sm justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <label className="text-[var(--small-color)] block mb-1">
              First Name:
            </label>
            <input
              type="text"
              name="fName"
              placeholder="Enter first name"
              value={form.fName}
              onChange={handleInputChange}
              className="w-full border-b border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-1 placeholder-red-950"
              required
            />
          </div>

          <div className="w-full">
            <label className="text-[var(--small-color)] block mb-1">
              Last Name:
            </label>
            <input
              type="text"
              name="lName"
              placeholder="Enter last name"
              value={form.lName}
              onChange={handleInputChange}
              className="w-full border-b border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-1 placeholder-red-950"
              required
            />
          </div>

          <div className="w-full">
            <label className="text-[var(--small-color)] block mb-1">
              Username:
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Choose a username"
              value={form.userName}
              onChange={handleInputChange}
              className="w-full border-b border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-1 placeholder-red-950"
              required
            />
          </div>

          <div className="w-full">
            <label className="text-[var(--small-color)] block mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full border-b border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-1 placeholder-red-950"
              required
            />
          </div>

          <div className="w-full">
            <label className="text-[var(--small-color)] block mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleInputChange}
              className="w-full border-b border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-1 placeholder-red-950"
              required
            />
          </div>

          <div className="w-full">
            <label className="text-[var(--small-color)] block mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className="w-full border-b border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-1 placeholder:text-shadow-white placeholder-red-950"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[var(--primary)] border border-[var(--small-color)]  hover:bg-orange-600 hover:scale-110 text-[var(--secondary)] font-bold text-base px-4 py-1 rounded-xl transition-all duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="flex items center  justify-center  gap-4 mt-2">
          <p className=" text-[var(--small-color)]">
            Already have an account?
          </p>
          <button
            onClick={() => navigate("/login")}
            className="text-[var(--primary)] font-medium hover:underline transition-all duration-300 cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
