import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const { login } = useContext(AuthContext);
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
      const res = await loginUser(form);

      login(res.data);  // store token
      navigate("/");          // go to tasks page
    } catch (error) {
      alert("Invalid credentials");
      console.error(error);
    }
  };

  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-4" style={{ width: "350px" }}>
      
      <h3 className="text-center mb-4">Login</h3>

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

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <p className="text-center mt-3 mb-0">
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>

    </div>
  </div>
);
}

export default Login;
