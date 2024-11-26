import { useState } from "react";
import SignLayout from "./signlayout";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import "react-toastify/dist/ReactToastify.css";
import { signUserFailure, signUserStart, signUserSuccess } from "@/slice/user-slice";
import UserService from "@/services/user.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { mode } = useSelector((state) => state.mode);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({}); // Validatsiya uchun xatolik holati
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    let errors = {};

    // Ismni tekshirish
    if (!userData.firstname.trim()) {
      errors.firstname = "Ismingizni kiriting.";
    }

    // Familiyani tekshirish
    if (!userData.lastname.trim()) {
      errors.lastname = "Familiyangizni kiriting.";
    }

    // Emailni tekshirish
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      errors.email = "Email manzilingizni kiriting.";
    } else if (!emailPattern.test(userData.email)) {
      errors.email = "Email formati noto'g'ri.";
    }

    // Parolni tekshirish
    if (!userData.password.trim()) {
      errors.password = "Parolingizni kiriting.";
    } else if (userData.password.length < 6) {
      errors.password = "Parol kamida 6 belgidan iborat bo'lishi kerak.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    dispatch(signUserStart());
    try {
      const response = await UserService.register(userData);
      localStorage.setItem("accessToken", response?.accessToken);
      toast.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz.");
      dispatch(signUserSuccess(response?.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(signUserFailure(error?.response?.data));
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <SignLayout>
        <form
          className={`w-full xs:w-[400px] pt-6  px-8 rounded-lg border border-gray-600 mx-auto font-spaceGrotesk shadow-md ${
            mode ? "bg-light" : "bg-zinc-800 login-animation"
          }`}
          onSubmit={registerHandler}
        >
          <h1 className="text-center text-xl font-montserrat font-semibold">Ro'yxatdan o'tish</h1>
          <p className="text-muted-foreground text-center">"Course" da ishlashni davom ettirish uchun</p>

          {/* GitHub va Google tugmalari */}
          <div className="flex items-center justify-center gap-4 my-2 w-full">
            <Button
              type="button"
              className={`flex gap-2 justify-center border items-center font-montserrat transition-all w-[35%] h-[30px] text-[14px] ${
                mode ? "text-gray-700 bg-light hover:bg-gray-300 border-gray-400" : "text-gray-400 bg-transparent border-gray-500 hover:bg-zinc-700"
              }`}
            >
              <FaGithub className="w-[16px] h-[16px]" />
              <span>GitHub</span>
            </Button>
            <Button
              type="button"
              className={`flex gap-2 justify-center border items-center font-montserrat transition-all w-[35%] h-[30px] text-[14px] ${
                mode ? "text-gray-700 bg-light hover:bg-gray-300 border-gray-400" : "text-gray-400 bg-transparent border-gray-500 hover:bg-zinc-700"
              }`}
            >
              <img src="./icon.svg" alt="icon" className="w-[16px] h-[16px]" />
              <span>Google</span>
            </Button>
          </div>

          {/* Qatorlararo ajratgich */}
          <div className="flex justify-center items-center gap-3 px-5 py-2">
            <hr className="border-t-0 border border-zinc-700 w-[40%]" />
            <span className="font-montserrat">yoki</span>
            <hr className="border-t-0 border border-zinc-700 w-[40%]" />
          </div>

          <div className="flex justify-between items-center gap-4">
            {/* Ism */}
            <div className="pt-2 py-2 flex flex-col gap-1">
              <label htmlFor="firstname">Ismingiz</label>
              <input
                type="text"
                placeholder="Ismingiz"
                className={`w-full h-[30px] px-3 rounded-sm border placeholder:text-[14px] focus:outline-none ${
                  mode ? "bg-gray-200" : "bg-zinc-800"
                }`}
                value={userData.firstname}
                onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>

            {/* Familiya */}
            <div className="pt-2 py-2 flex flex-col gap-1">
              <label htmlFor="lastname">Familiyangiz</label>
              <input
                type="text"
                placeholder="Familiyangiz"
                className={`w-full h-[30px] px-3 rounded-sm border placeholder:text-[14px] focus:outline-none ${
                  mode ? "bg-gray-200" : "bg-zinc-800"
                }`}
                value={userData.lastname}
                onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="pt-2 py-2 flex flex-col font-montserrat gap-1">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              placeholder="Email manzilingizni kiriting..."
              className={`w-full h-[30px] px-3 rounded-sm border placeholder:text-[14px] focus:outline-none ${mode ? "bg-gray-200" : "bg-zinc-800"}`}
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Parol */}
          <div className="flex flex-col gap-1 font-montserrat relative">
            <label htmlFor="password">Parol</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Parolingizni kiriting..."
              className={`w-full h-[30px] px-3 rounded-sm border focus:outline-none placeholder:text-[14px] ${mode ? "bg-gray-200" : "bg-zinc-800"}`}
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-0 p-2 px-3 bottom-0">
              {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Telefon */}
          <div className="pt-2 py-4 flex flex-col font-montserrat gap-1">
            <label htmlFor="phone">Telefon</label>
            <input
              type="text"
              placeholder="Telefon raqamingiz"
              className={`w-full h-[30px] px-3 rounded-sm border placeholder:text-[14px] focus:outline-none ${mode ? "bg-gray-200" : "bg-zinc-800"}`}
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          </div>

          {/* Tugma */}
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full h-[30px] mt-8 font-montserrat ${
              mode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-light text-darkBlue hover:bg-gray-300"
            }`}
          >
            {isLoading ? "Loading..." : "Davom etish"}
          </Button>

          {/* Kirish */}
          <div className="flex justify-center items-center gap-2 font-montserrat text-[13px] py-4">
            <span>Akkauntingiz bormi?</span>
            <span
              className="cursor-pointer hover:underline underline-offset-4 hover:text-blue-500 transition-all"
              onClick={() => navigate("/sign-in")}
            >
              Kirish
            </span>
          </div>
        </form>
      </SignLayout>
    </div>
  );
};

export default SignUp;
