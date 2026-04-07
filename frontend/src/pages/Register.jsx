import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log("FULL ERROR:", error.response);
      alert(error.response?.data?.message ||"already registered please register with another email");
    }
  };

  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-4" style={{ width: "350px" }}>
      
      <h3 className="text-center mb-4">Register</h3>

      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>

      <p className="text-center mt-3 mb-0">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

    </div>
  </div>
);
}

export default Register;
