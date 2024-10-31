import { useEffect } from "react";
import AdminLayout from "../admin/admin-layout";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminPage = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
  });

  return <AdminLayout>AdminPage</AdminLayout>;
};

export default AdminPage;
