import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LuUpload } from "react-icons/lu";
import UserService from "@/services/user.service";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserFailure,
  signUserStart,
  signUserSuccess,
} from "@/slice/user-slice";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ setIsOpen, mode }) => {
  const [updateData, setUpdateData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    image: "",
    bio: "",
  });
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const getUser = async () => {
    dispatch(signUserStart());
    try {
      const { user } = await UserService.getUser();
      dispatch(signUserSuccess(user));
      setUpdateData(user);
    } catch (error) {
      dispatch(signUserFailure(error));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setUpdateData({ ...updateData, image: file });
    toast.success("Rasm yuklandi!", { position: "top-center" });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const formData = new FormData();
    formData.append("email", updateData.email);
    formData.append("firstname", updateData.firstname);
    formData.append("lastname", updateData.lastname);
    formData.append("phone", updateData.phone);
    formData.append("image", updateData.image);
    formData.append("bio", updateData.bio);
    try {
      const response = await UserService.updateUser(formData);
      toast.success("Siz muvaffaqiyatli tahrirladingiz");
      dispatch(signUserSuccess(response.user));
      setIsOpen(false);
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(signUserFailure(error.response.data));
    }
  };
  return (
    <div
      className="fixed top-0 left-0 flex justify-end w-full h-screen overflow-y-scroll bg-[rgba(0,0,0,0.8)] z-0"
      onClick={closeModal}
    >
      <div className="sm:w-1/2 xs:w-[80%] w-full">
        <form
          className={`w-full z-10 min-h-screen ${
            mode ? "bg-white" : "bg-darkBlue"
          } animate-right relative p-6`}
          onClick={(e) => e.stopPropagation()}
          onSubmit={updateHandler}
        >
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold font-montserrat">
                Profilni tahrirlash
              </h1>
              <div className="flex flex-col my-4 gap-2">
                <label htmlFor="firstname">Emailingiz</label>
                <input
                  type="text"
                  placeholder="Emailingiz"
                  className={`h-[40px] px-3 ${
                    mode ? "bg-gray-200" : "bg-gray-800"
                  } rounded-sm focus:outline-none`}
                  value={updateData.email}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col my-4 gap-2">
                <label htmlFor="firstname">Ismingiz</label>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  className={`h-[40px] px-3 ${
                    mode ? "bg-gray-200" : "bg-gray-800"
                  } rounded-sm focus:outline-none`}
                  value={updateData.firstname}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, firstname: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col my-4 gap-2">
                <label htmlFor="firstname">Familiyangiz</label>
                <input
                  type="text"
                  placeholder="Familiyangiz"
                  className={`h-[40px] px-3 ${
                    mode ? "bg-gray-200" : "bg-gray-800"
                  } rounded-sm focus:outline-none`}
                  value={updateData.lastname}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, lastname: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col my-4 gap-2">
                <label htmlFor="firstname">Telefon raqamingiz</label>
                <input
                  type="text"
                  placeholder="Telefon raqamingiz?"
                  className={`h-[40px] px-3 ${
                    mode ? "bg-gray-200" : "bg-gray-800"
                  } rounded-sm focus:outline-none`}
                  value={updateData.phone}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, phone: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col my-4 gap-2">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Profilga rasm yuklash
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={onFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className={`h-[40px] px-5 flex items-center justify-start gap-4 cursor-pointer ${
                    mode ? "bg-gray-200" : "bg-gray-800"
                  } rounded-sm text-white focus:outline-none hover:bg-gray-700`}
                >
                  <LuUpload className="text-xl" />{" "}
                  <span>Profilga rasm yuklash</span>
                </label>
              </div>

              <div className="flex flex-col my-4 gap-2">
                <label htmlFor="firstname">Bio</label>
                <textarea
                  type="text"
                  placeholder="BIO"
                  className={`px-3 ${
                    mode ? "bg-gray-200" : "bg-gray-800"
                  } rounded-sm focus:outline-none min-h-[130px] py-3`}
                  value={updateData.bio}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, bio: e.target.value })
                  }
                ></textarea>
              </div>
              <Button className="bg-green-500 hover:bg-blue-600" type="submit">
                Saqlash
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
