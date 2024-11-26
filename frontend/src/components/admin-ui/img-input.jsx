import { useSelector } from "react-redux";
import { useState } from "react";
import { IoIosSave } from "react-icons/io";
import { LuUpload } from "react-icons/lu";
import { toast } from "react-toastify";

const ImgInput = ({ setState, title = "Kurs uchun rasm yuklash", required = false }) => {
  const { mode } = useSelector((state) => state.mode);
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("Siz rasm tanlashingiz kerak");
    setState((prev) => ({ ...prev, image: file }));
    setFileSelected(!!file);
  };

  return (
    <div className="flex flex-col justify-center items-stretch mt-3">
      <span className="my-1">{title}</span>
      <label
        htmlFor="file-upload"
        className={`w-full h-[35px] flex items-center justify-start cursor-pointer rounded-sm border px-3 ${
          mode ? "bg-white text-gray-700 border-gray-300 hover:text-black" : "bg-zinc-700 text-white hover:text-black border-zinc-600"
        } transition-colors`}
      >
        {fileSelected ? (
          <span className="flex items-center gap-2">
            <IoIosSave className="text-[20px]" />
            Rasm tanlandi
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <LuUpload className="text-[20px]" />
            {title}
          </span>
        )}
      </label>
      <input type="file" id="file-upload" className="hidden" required={required} onChange={handleFileChange} />
    </div>
  );
};

export default ImgInput;
