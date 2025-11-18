import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/authApi";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerApi(form);
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

      <div>
        <label className="label">Full Name</label>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Enter full name"
          onChange={handleChange}
          required
        />
      </div>

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

      <button className="btn-primary w-full">Register</button>

      <p className="text-xs text-center text-slate-500">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;
