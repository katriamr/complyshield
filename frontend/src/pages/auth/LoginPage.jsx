import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const data = await loginApi(form);

    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      company: data.company
    };

    login(data.token, userData);

    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-center mb-4">Welcome Back</h2>

      <div>
        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button className="btn-primary w-full">Login</button>

      <p className="text-xs text-center text-slate-500">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
