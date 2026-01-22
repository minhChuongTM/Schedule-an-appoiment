import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/services/auth/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "~/assets/styles/auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    console.log("Form submitted!");
    console.log("Email:", email);
    console.log("Password:", password);
    
    try {
      console.log("Calling login function...");
      const result = await login(email, password);
      console.log("Login result:", result);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response);
      
      if (err.response && err.response.status === 401) {
        setError("Email hoặc mật khẩu không chính xác.");
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại kết nối.");
      }
    }
  };

  return (
    <div className="container-fluid login-wrapper p-0">
      <div className="row min-vh-100 g-0">
        <div className="col-md-6 d-none d-md-flex login-left">
          {/* Chứa ảnh */}
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center py-5">
          <div className="login-form w-75">
            <h4 className="mb-3 text-center">Đăng nhập</h4>
            <p className="text-muted text-center mb-4">
              Chăm sóc sức khỏe của bạn tốt nhất
            </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>

              <div className="d-flex justify-content-center align-items-center mb-4">
                <Link to="/dang-ky" className="text-link">
                  Bạn chưa có tài khoản?
                </Link>
              </div>

              <button type="submit" className="btn btn-main w-100">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
