import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/services/auth/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "~/assets/styles/auth.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [gender, setGender] = useState("male");

  // Address State
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  // Fetch Provinces, Districts, Wards from local JSON or API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchData();
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);

    // Automatically update districts based on selection, no need for useEffect
    if (provinceId) {
      const province = provinces.find(p => p.Id === provinceId);
      setDistricts(province ? province.Districts : []);
    } else {
      setDistricts([]);
    }

    // Reset child fields
    setWards([]);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    // Automatically update wards based on selection, no need for useEffect
    if (districtId) {
      const district = districts.find(d => d.Id === districtId);
      setWards(district ? district.Wards : []);
    } else {
      setWards([]);
    }

    // Reset child field
    setSelectedWard("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    // Construct full address
    const provinceName = provinces.find(p => p.Id === selectedProvince)?.Name || "";
    const districtName = districts.find(d => d.Id === selectedDistrict)?.Name || "";
    const wardName = wards.find(w => w.Id === selectedWard)?.Name || "";

    const fullAddress = `${specificAddress}, ${wardName}, ${districtName}, ${provinceName}`;

    // Format date for API (YYYY-MM-DD)
    // Using local time to avoid timezone shifts
    const formattedBirthdate = birthdate
      ? `${birthdate.getFullYear()}-${String(birthdate.getMonth() + 1).padStart(2, '0')}-${String(birthdate.getDate()).padStart(2, '0')}`
      : "";

    setError("");
    try {
      await register(name, email, password, passwordConfirmation, formattedBirthdate, gender, fullAddress);
      // Redirect to home or login page after successful registration
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const firstError = Object.values(err.response.data.errors)[0];
          setError(Array.isArray(firstError) ? firstError[0] : firstError);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Đăng ký thất bại. Vui lòng thử lại.");
        }
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
      console.error(err);
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
            <h4 className="mb-3 text-center">Đăng ký</h4>
            <p className="text-muted text-center mb-4">
              Tạo tài khoản mới để trải nghiệm dịch vụ
            </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted" style={{ fontSize: "14px", marginLeft: "4px" }}>Ngày sinh</label>
                <div className="custom-datepicker-wrapper">
                  <DatePicker
                    className="form-control"
                    selected={birthdate}
                    onChange={(date) => setBirthdate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Chọn ngày sinh"
                    required
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                  />
                </div>
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              {/* Address Section */}
              <div className="mb-3 row">
                <div className="col-md-4 mb-2 mb-md-0">
                  <select
                    className="form-select"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    required
                  >
                    <option value="">Tỉnh/Thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.Id} value={province.Id}>
                        {province.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-2 mb-md-0">
                  <select
                    className="form-select"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    required
                    disabled={!selectedProvince}
                  >
                    <option value="">Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.Id} value={district.Id}>
                        {district.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    required
                    disabled={!selectedDistrict}
                  >
                    <option value="">Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Id}>
                        {ward.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Số nhà, tên đường"
                  value={specificAddress}
                  onChange={(e) => setSpecificAddress(e.target.value)}
                  required
                  autoComplete="street-address"
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
                  autoComplete="new-password"
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>

              <div className="mb-3 position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Xác nhận mật khẩu"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>

              <div className="d-flex justify-content-center align-items-center mb-4">
                <Link to="/dang-nhap" className="text-link">
                  Đã có tài khoản? Đăng nhập ngay
                </Link>
              </div>

              <button type="submit" className="btn btn-main w-100">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
