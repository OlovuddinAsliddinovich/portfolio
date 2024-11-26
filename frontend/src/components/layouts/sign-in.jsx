import { useDispatch, useSelector } from "react-redux";
import SignLayout from "./signlayout";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import {
  signUserFailure,
  signUserStart,
  signUserSuccess,
} from "@/slice/user-slice";
import UserService from "@/services/user.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { mode } = useSelector((state) => state.mode);
  const { isLoading } = useSelector((state) => state.userData);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    // Email validatsiyasi
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      errors.email = "Email manzilingizni kiriting.";
    } else if (!emailPattern.test(userData.email)) {
      errors.email = "Email formati noto'g'ri.";
    }

    // Parol validatsiyasi
    if (!userData.password.trim()) {
      errors.password = "Parolingizni kiriting.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Agar xatolik bo'lmasa true qaytaradi
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) navigate("/");
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const isValidate = validateForm();
    if (!isValidate) return;
    dispatch(signUserStart());
    try {
      const response = await UserService.login(userData);
      localStorage.setItem("accessToken", response?.accessToken);
      toast.success("Login successfully!");
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error?.response?.data || error?.message));
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <SignLayout>
      <form
        className={`w-full xs:w-[400px] border border-gray-600 pt-8 px-8 rounded-lg mx-auto font-spaceGrotesk ${
          mode ? "bg-light" : "bg-zinc-800 login-animation"
        }`}
        onSubmit={loginHandler}
      >
        <h1 className="text-center text-xl font-montserrat font-semibold">
          Kirish
        </h1>
        <p className="text-muted-foreground text-center">
          "Course" da ishlashni davom ettirish uchun
        </p>
        <div className="flex items-center justify-center gap-4 my-4 w-full">
          <Button
            type="button"
            className={`flex gap-2 justify-center border items-center font-montserrat transition-all w-[35%] h-[30px] text-[14px] ${
              mode
                ? "text-gray-700 bg-light hover:bg-gray-300 border-gray-400"
                : "text-gray-400 bg-transparent border-gray-500 hover:bg-zinc-700"
            }`}
          >
            <FaGithub className="text-[16px] min-w-[16px]" />
            <span>GitHub</span>
          </Button>
          <Button
            type="button"
            className={`flex gap-2 justify-center border items-center font-montserrat transition-all w-[35%] h-[30px] text-[14px] ${
              mode
                ? "text-gray-700 bg-light hover:bg-gray-300 border-gray-400"
                : "text-gray-400 bg-transparent border-gray-500 hover:bg-zinc-700"
            }`}
          >
            <img src="./icon.svg" alt="icon" className="w-[16px] h-[16px]" />
            <span>Google</span>
          </Button>
        </div>
        <div className="flex justify-center items-center gap-3 p-5">
          <hr className="border-t-0 border border-zinc-700 w-[40%]" />
          <span className="font-montserrat">yoki</span>
          <hr className="border-t-0 border border-zinc-700 w-[40%]" />
        </div>

        {/* Email */}
        <div className="pt-2 py-4 flex flex-col gap-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            placeholder="Email manzilingizni kiriting..."
            className={`w-full h-[30px] px-3 rounded-sm border placeholder:text-[14px] focus:outline-none ${
              mode ? "bg-gray-200" : "bg-zinc-800"
            }`}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Parol */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password">Parol</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Parolingizni kiriting..."
            className={`w-full h-[30px] px-3 rounded-sm border focus:outline-none placeholder:text-[14px] ${
              mode ? "bg-gray-200" : "bg-zinc-800"
            }`}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute right-0 p-2 px-3 bottom-0"
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* Davom etish tugmasi */}
        <Button
          type="submit"
          className={`w-full h-[30px] mt-8 font-montserrat ${
            mode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-light text-darkBlue hover:bg-gray-300"
          }`}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Davom etish"}
        </Button>

        {/* Ro'yxatdan o'tish */}
        <div className="flex justify-center items-center gap-2 font-montserrat text-[13px] py-4">
          <span>Accountingiz yo'qmi?</span>
          <span
            className="cursor-pointer hover:underline underline-offset-4 hover:text-blue-500 transition-all"
            onClick={() => navigate("/sign-up")}
          >
            Ro'yxatdan o'tish
          </span>
        </div>
      </form>
    </SignLayout>
  );
};

export default SignIn;
