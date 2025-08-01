import React, { useState } from "react";
import { loginUser } from "../services/userServices.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(form);

      if (response) {
        const { user, token } = response;

        login({ ...user, token });

        toast.success("Logged in successfully!");
        navigate("/dashboard/add-task");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Invalid username or password");
      console.error(error);
    }
  };

  return (
    <div className="login flex flex-col lg:flex-row justify-between max-w-[95%] sm:max-w-[90%] md:max-w-[80%] xl:max-w-[70%] h-auto lg:h-[70vh] border-2 border-amber-200 mx-auto mt-10 rounded-4xl overflow-hidden  ">
      <div className="left bg-[url(./images/bg3.svg)] w-full lg:w-1/2 bg-cover bg-no-repeat flex items-center justify-center py-12 px-4 bg-blend-darken bg-[var(--small-color)] ">
         
      </div>

      <div className="right bg-[var(--secondary)] w-full lg:w-1/2 flex flex-col py-8 px-6 sm:px-10">
        <h2 className="text-[var(--primary)] text-2xl sm:text-3xl mb-8">
          Log In
        </h2>

        <form
          className="flex flex-col bg-[var(--text-color)] rounded-2xl p-4 sm:p-6 text-base sm:text-lg justify-center items-center gap-6"
          onSubmit={handleLogin}
        >
          <div className="w-full">
            <label className="text-[var(--small-color)] block mb-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username here"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              required
              className="w-full border-b-2 border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-2 placeholder-red-950"
            />
          </div>

          <div className="w-full relative">
            <label className="text-[var(--small-color)] block mb-1">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password here"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full border-b-2 border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-2 pr-10 placeholder-red-950"
            />
            <div
              className="absolute right-2 top-9 cursor-pointer text-[var(--primary)]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 sm:mt-8 bg-[var(--primary)] border-2 border-[var(--small-color)] hover:bg-orange-600 hover:text-[var(--secondary)] text-[var(--secondary)] font-bold text-lg sm:text-xl px-4  rounded-2xl transition-all duration-300 cursor-pointer hover:scale-110"
          >
            Login
          </button>

        </form>
        <div className="flex items-center justify-center gap-2 mt-2 p-2">
        <p className=" text-[var(--small-color)]">Don't have an account?</p>
            <button
             
              className="text-[var(--primary)] font-medium hover:underline  transition-all duration-300 cursor-pointer" onClick={()=> navigate("/signup")}
            >
              Sign Up
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
