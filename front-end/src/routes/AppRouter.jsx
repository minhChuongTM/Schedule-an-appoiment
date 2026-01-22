import { Route, Routes } from "react-router";
import AboutPage from "~/pages/about/AboutPage";
import ContactPage from "~/pages/contact/ContactPage";
import HomePage from "~/pages/home/HomePage";
import ServicePage from "~/pages/service/ServicePage";
import Signup from "~/pages/auth/SignUp";
import TreatmentPage from "~/pages/treatment/TreatmentPage";
import SignIn from "~/pages/auth/SignIn";
import Admin from "~/pages/admin/Admin";
import FindDoctors from "~/pages/doctors/FindDoctors";
import DoctorDetail from "~/pages/doctors/DoctorDetail";
import BookAppointment from "~/pages/appointments/BookAppointment";
import Dashboard from "~/pages/dashboard/Dashboard";
import ProtectedRoute from "~/components/ProtectedRoute";
import HuongDanKhamBenh from "~/pages/instruct/HuongDanKhambenh";
import HuongDanNhapVien from "~/pages/instruct/HuongDanNhapVien";
import NoiQuyBenhVien from "~/pages/instruct/NoiQuyBenhVien";
import HuongDanThamBenh from "~/pages/instruct/HuongDanThamBenh";
import HuongDanChuanBiPhauThuat from "~/pages/instruct/HuongDanChuanBiPhauThuat";
import HuongDanBaoHiemYTe from "~/pages/instruct/HuongDanBaoHiemYTe";
import HuongDanXuatVien from "~/pages/instruct/HuongDanXuatVien";
import HospitalHotline from "~/pages/about/HospitalHotline";
import HospitalQualityPolicy from "~/pages/about/HospitalQualityPolicy";
import OrganizationStructure from "~/pages/about/OrganizationStructure";
import Sent from "~/pages/contact/Sent";
import PhauThuat from "~/pages/service/PhauThuat";
import XuatVienSom from "~/pages/service/XuatVienSom";
import ChuyenPhat from "~/pages/service/ChuyenPhat";
import XeVanChuyen from "~/pages/service/XeVanChuyen";
import TuVanThuoc from "~/pages/service/TuVanThuoc";
import Recruitment from "~/pages/recruitment/Recruitment";
import NgoaiTongQuat from "~/pages/treatment/NgoaiTongQuat";
import NgoaiTietNieu from "~/pages/treatment/NgoaiTietNieu";
import NamKhoa from "~/pages/treatment/NamKhoa";
import NieuNu from "~/pages/treatment/NieuNu";
import TimMachMau from "~/pages/treatment/TimMachMau";
import ChuyenKhoaKhac from "~/pages/treatment/ChuyenKhoaKhac";
import BlogDetail from "~/pages/blogs/BlogDetail";
import BlogPage from "~/pages/blogs/BlogPage";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        <Route path="dich-vu" element={<ServicePage />} />
        <Route path="lien-he" element={<ContactPage />} />
        <Route path="sent" element={<Sent />} />
        <Route path="dang-nhap" element={<SignIn />} />
        <Route path="dang-ky" element={<Signup />} />
        <Route path="tim-bac-si" element={<FindDoctors />} />
        <Route path="bac-si/:id" element={<DoctorDetail />} />

        {/* Nhóm truyền thông */}
        <Route path="truyen-thong">
          <Route index element={<BlogPage />} />
          <Route path="tin-tuc" element={<BlogPage category="Tin tức" title="Tin tức" breadcrumb="Tin tức" />} />
          <Route path="su-kien" element={<BlogPage category="Sự kiện" title="Sự kiện" breadcrumb="Sự kiện" />} />
          <Route path="bao-chi" element={<BlogPage category="Báo chí" title="Báo chí" breadcrumb="Báo chí" />} />
          <Route path="tuyen-dung" element={<BlogPage category="Tuyển dụng" title="Tuyển dụng" breadcrumb="Tuyển dụng" />} />
          <Route path=":id" element={<BlogDetail />} />
        </Route>
        <Route path="tuyen-dung" element={<Recruitment />} />

        {/* Nhóm điều trị */}
        <Route path="/dieu-tri" element={<TreatmentPage />} />
        <Route path="/dieu-tri/ngoai-tong-quat" element={<NgoaiTongQuat />} />
        <Route path="/dieu-tri/ngoai-tiet-nieu" element={<NgoaiTietNieu />} />
        <Route path="/dieu-tri/nam-khoa" element={<NamKhoa />} />
        <Route path="/dieu-tri/nieu-nu" element={<NieuNu />} />
        <Route path="/dieu-tri/tim-mach-mau" element={<TimMachMau />} />
        <Route path="/dieu-tri/chuyen-khoa-khac" element={<ChuyenKhoaKhac />} />

        {/* Nhóm Giới Thiệu */}
        <Route path="gioi-thieu">
          <Route index element={<AboutPage />} /> {/* path: /gioi-thieu */}
          <Route path="duong-day-nong" element={<HospitalHotline />} />
          <Route path="chinh-sach-chat-luong" element={<HospitalQualityPolicy />} />
          <Route path="co-cau-to-chuc" element={<OrganizationStructure />} />
        </Route>

        {/* Nhóm Hướng Dẫn */}
        <Route path="huong-dan">
          <Route path="kham-benh" element={<HuongDanKhamBenh />} />
          <Route path="nhap-vien" element={<HuongDanNhapVien />} />
          <Route path="noi-quy-benh-vien" element={<NoiQuyBenhVien />} />
          <Route path="tham-benh" element={<HuongDanThamBenh />} />
          <Route path="chuan-bi-phau-thuat" element={<HuongDanChuanBiPhauThuat />} />
          <Route path="bao-hiem-y-te" element={<HuongDanBaoHiemYTe />} />
          <Route path="xuat-vien" element={<HuongDanXuatVien />} />
        </Route>

        {/* Protected Routes (Yêu cầu đăng nhập) */}
        <Route element={<ProtectedRoute />}>
          <Route path="dat-lich" element={<BookAppointment />} />
          <Route path="thong-tin-cua-toi" element={<Dashboard />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* Nhóm dịch vụ */}
        <Route path="dich-vu">
          <Route path="phau-thuat" element={<PhauThuat />} />
          <Route path="xuat-vien-som" element={<XuatVienSom />} />
          <Route path="chuyen-phat" element={<ChuyenPhat />} />
          <Route path="xe-van-chuyen" element={<XeVanChuyen />} />
          <Route path="tu-van-thuoc" element={<TuVanThuoc />} />
        </Route>

        {/* 404 Page (Tùy chọn) */}
        {/* <Route path="*" element={<NotFound />} /> Làm sau*/}
      </Routes>
    </div>
  );
};

export default AppRouter;
