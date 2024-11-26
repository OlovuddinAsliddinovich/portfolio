import React from "react";
import AdminLayout from "../admin/admin-layout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import commentService from "@/services/comment-service";
import moment from "moment";
import { IMG_URL } from "@/services";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import CommentSkeleton from "../skeletons/comment.skeleton";
import { Helmet } from "react-helmet";

const AdminComments = () => {
  const adminToken = Cookies.get("adminToken");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { mode } = useSelector((state) => state.mode);

  const allComments = async () => {
    setLoading(true);
    try {
      const response = await commentService.getAll();
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (refModel, refId, commentId) => {
    setDeleteLoading(true);
    try {
      await commentService.deleteComment(refModel, refId, commentId);
      allComments();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (!adminToken) {
      navigate("/");
    }
    allComments();
  }, []);
  return (
    <AdminLayout>
      <Helmet>
        <title>Admin | Foydalanuvchi Sharhlari</title>
        <meta name="description" content="Foydalanuvchi Sharhlari" />
      </Helmet>
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto ${mode ? "bg-light" : "bg-slate text-white"}`}>
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Foydalanuvchi Sharhlari</h2>
        {loading ? (
          <CommentSkeleton />
        ) : data.length === 0 ? (
          <p className="text-center">Sharhlar hali mavjud emas.</p>
        ) : (
          <div className="space-y-6">
            {data.map((comment) => (
              <div
                key={comment._id}
                className={`p-4 relative rounded-lg shadow-sm border border-gray-400 hover:shadow-md transition-shadow ${
                  mode ? "bg-light" : "bg-slate text-white"
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  {comment?.user?.image ? (
                    <img
                      src={`${IMG_URL}/${comment?.user?.image}`}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold">
                      {comment?.user?.firstname.charAt(0).toUpperCase() + comment?.user?.lastname.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {comment?.user?.firstname} {comment?.user?.lastname}
                    </h3>
                    <p className="text-sm text-gray-400">{moment(comment.createdAt).format("DD MMM YYYY, HH:mm")}</p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger className="absolute top-[35%] right-2 h-[30px] bg-red-500 hover:bg-red-600 transition-all text-white p-2 flex items-center justify-center rounded">
                    O'chirish
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bu sharhni o'chirmoqchimisiz?</AlertDialogTitle>
                      <AlertDialogDescription>Sharh butunlay o'chib ketadi! O'chirilsinmi?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteComment(comment?.refModel, comment?.refId?._id, comment._id)}
                        className="bg-red-500 hover:bg-red-600 w-[150px]"
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? "O'chirilmoqda..." : "O'chirish"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < comment?.rating ? "gold" : "none"}
                      stroke={index < comment?.rating ? "gold" : "gray"}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  ))}
                </div>

                <p>{comment?.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminComments;
