import { Link, useNavigate } from "react-router-dom";
import { FaTelegram, FaUserTie } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon, RxAvatar } from "react-icons/rx";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "@/slice/mode-slice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GrSettingsOption } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import UserService from "@/services/user.service";
import { signOutUser, signUserStart } from "@/slice/user-slice";
import { toast } from "react-toastify";
const Navbar = () => {
  const { mode } = useSelector((state) => state.mode);
  const { isLoading, loggedIn, user } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(signUserStart());
    try {
      await UserService.logout();
      dispatch(signOutUser());
      toast.success("Logout success!", { position: "top-center" });
      localStorage.removeItem("accessToken");
    } catch (error) {
      dispatch(signUserFailure(error));
      toast.error("Error with logout!");
    }
  };

  return (
    <div className="w-full container mx-auto h-[80px] flex items-center justify-between px-3 xl:px-[100px] py-[16px]">
      <Link to={"/"}>
        <h1
          className="text-[40px] bg-[url('/logo.jfif')] bg-no-repeat bg-clip-text text-transparent bg-cover 
       font-bold"
        >
          Course
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-1 group">
        <div className="md:flex hidden">
          <Button
            title="Telegram orqali bog'lanish"
            onClick={() => window.open("https://t.me/Olovuddin_Asliddinovich")}
            className={`text-[20px] ${mode ? "text-gray-800 bg-light hover:bg-gray-200" : "text-white hover:bg-gray-600"}`}
          >
            <FaTelegram />
          </Button>
          <Button
            onClick={() => dispatch(setMode(!mode))}
            className={`text-[20px] ${mode ? "text-gray-800 bg-light hover:bg-gray-200" : "text-white hover:bg-gray-600"}`}
          >
            {mode ? <RxMoon /> : <IoSunnyOutline className="text-[20px]" />}
          </Button>
        </div>
        {isLoading ? (
          <Button
            onClick={() => navigate("/sign-in")}
            className={`text-[16px] w-[40px] relative flex items-center  justify-center gap-2 p-1 rounded-sm cursor-pointer bg-darkblue ${
              mode ? "text-white" : "text-gray-950"
            }`}
          >
            <Avatar>
              <AvatarFallback>
                <FaUserTie className={`${mode ? "bg-white" : "bg-gray-950"} text-[20px]`} />
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : loggedIn ? (
          <Button
            className={`text-[16px] w-auto relative flex items-center  justify-center gap-2 p-1 rounded-sm cursor-pointer ${
              mode ? "text-white bg-gray-100 hover:bg-gray-100" : "text-gray-950"
            }`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={`${
                      user.image
                        ? `http://localhost:5000/${user.image}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaJS0dnDYQ5NkVr30LWhCjQoMLtm6BC0TDA&s"
                    }`}
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`absolute z-[100] top-4 left-[-180px] text-start border border-gray-600 ${
                  mode ? "bg-gray-300 text-gray-900" : " text-white bg-gray-900"
                } `}
              >
                <DropdownMenuItem className=" hover:text-gray-400 flex items-center border-gray-800 justify-start gap-1 border-b p-2 px-4 outline-none">
                  <RxAvatar className="mt-1" />
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" hover:text-gray-400 border-b px-4 border-gray-800 p-2 outline-none flex justify-start items-center gap-1"
                  onClick={() => navigate("/profile")}
                >
                  <GrSettingsOption className="mt-1" />
                  Hisobni boshqarish
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" hover:text-gray-400 p-2 flex justify-start items-center gap-1 outline-none px-4"
                  onClick={logoutHandler}
                >
                  <LuLogOut className="mt-1" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/sign-in")}
            className={`text-[16px] w-[100px] relative flex items-center  justify-center gap-2 p-1 rounded-sm cursor-pointer bg-blue-600 hover:bg-blue-700 ${
              mode ? "text-white" : "text-gray-950"
            }`}
          >
            Kirish <RxAvatar />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
