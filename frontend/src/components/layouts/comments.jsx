import { IMG_URL } from "@/services";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const Comments = ({ data, setCommentModal }) => {
  const { mode } = useSelector((state) => state.mode);
  return (
    <div
      className="w-full h-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 z-50 flex items-center justify-center"
      onClick={() => setCommentModal(false)}
    >
      <div
        className={`w-full xs:w-[80%] sm:w-[60%] md:w-[50%] h-full xs:h-[95%] flex items-center flex-col justify-start ${
          mode ? "bg-light" : "bg-slate"
        } overflow-y-scroll relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute top-0 right-2 text-2xl font-bold cursor-pointer text-white" onClick={() => setCommentModal(false)}>
          &times;
        </span>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold pt-3 font-spaceGrotesk">Barcha sharhlar</h1>
        </div>
        {data?.length > 0 ? (
          <div className="p-2 grid sm:grid-cols-2 grid-cols-1 gap-4 px-4">
            {data
              ?.slice()
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => (
                <div className="border-t pt-[20px] border-gray-600 mt-3" key={item._id}>
                  <div className="flex gap-2 items-center font-montserrat">
                    {item?.user?.image ? (
                      <img src={`${IMG_URL}/${item?.user?.image}`} alt="Img" className="w-[50px] h-[50px] rounded-full" />
                    ) : (
                      <h1 className="text-2xl bg-blue-500 w-[50px] h-[50px] flex items-center justify-center rounded-full">
                        {item.user?.firstname.charAt(0).toUpperCase() + item.user?.lastname.charAt(0).toUpperCase()}
                      </h1>
                    )}
                    <div>
                      <h3>{item?.user?.firstname + " " + item?.user?.lastname}</h3>
                      <p>
                        <span className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              fill={index < item.rating ? "gold" : "none"} // Sariq yoki bo'sh
                              stroke={index < item.rating ? "gold" : "gray"} // Chekka rangi
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
                        </span>
                        <span className="text-muted-foreground text-[13px] font-bold">{moment(item.createdAt).format("DD MMM YYYY HH:mm")}</span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-[14px]">{item.text}</p>
                </div>
              ))}
          </div>
        ) : (
          <h1 className="font-spaceGrotesk">Sharhlar mavjud emas</h1>
        )}
      </div>
    </div>
  );
};

export default Comments;
