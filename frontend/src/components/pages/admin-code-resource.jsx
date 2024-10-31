import { useNavigate } from "react-router-dom";
import AdminLayout from "../admin/admin-layout";
import Cookies from "js-cookie";
import { useEffect } from "react";

const AdminCodeResource = () => {
  const navigate = useNavigate();
  const adminToken = Cookies.get("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin-sign");
    }
  });
  return <AdminLayout>AdminCodeResource</AdminLayout>;
};

export default AdminCodeResource;
