import { useSelector } from "react-redux";
import Layout from "../layouts/layout";
import { FaAngleRight } from "react-icons/fa";
import { BsFillStarFill, BsPatchCheck } from "react-icons/bs";
import { ImStarHalf } from "react-icons/im";
import { LiaSignInAltSolid } from "react-icons/lia";
import { HiMiniStar } from "react-icons/hi2";
import { Button } from "../ui/button";
import { TbListNumbers } from "react-icons/tb";
import { LuMonitorPlay } from "react-icons/lu";
import { GrPlan } from "react-icons/gr";
import { AccordionDemo } from "../layouts/accordion-content";
import { BiMessageDetail } from "react-icons/bi";
import { TooltipDemo } from "../layouts/tooltip-demo";
import { CarouselSize } from "../layouts/carousel-detail";

const CourseDetail = () => {
  const { mode } = useSelector((state) => state.mode);
  const technologies = [
    { id: 1, name: "NodeJS" },
    { id: 2, name: "ExpressJS" },
    { id: 3, name: "SMTP" },
    { id: 4, name: "JWT" },
    { id: 5, name: "Access token" },
    { id: 6, name: "Refresh token" },
    { id: 7, name: "Cookie" },
    { id: 8, name: "Middleware" },
    { id: 9, name: "Backend patterns" },
    { id: 10, name: "Avtorizatsiya" },
    { id: 11, name: "Token model" },
    { id: 12, name: "Service" },
    { id: 13, name: "Controller" },
    { id: 14, name: "ReactJS" },
    { id: 15, name: "Tanstack react query" },
    { id: 16, name: "Mutations" },
    { id: 17, name: "Interceptors" },
    { id: 18, name: "Akkaunt aktivatsiya" },
    { id: 19, name: "Forgot password funktsional" },
  ];

  const courseContent = [
    {
      id: 1,
      title: "Modullar soni",
      icon: <TbListNumbers className="text-5xl" />,
      count: "4 ta",
    },
    {
      id: 2,
      title: "Darslar soni",
      icon: <LuMonitorPlay className="text-5xl" />,
      count: "35 ta",
    },
    {
      id: 3,
      title: "Kurs davomiyligi",
      icon: <GrPlan className="text-5xl" />,
      count: "10 soat 52 daqiqa",
    },
  ];

  const courseForWhom = [
    "Backend texnologiyasini murakkab o'rganish istagi borlar",
    "Full-Stack loyiha qilishni",
    "Backendga oid murakkab mavzularni o'rganmoqchi bo'lganlar",
    "Interceptorlar qanday ishlashini",
    "Access va Refresh token bilan avtorizatsiyani realizatsiya qilishni",
    "Emailga xat yuborishni",
    "Akkount aktivatsiya qilishni",
  ];

  const reviews = [
    {
      name: "Abdulloh Qiyomov",
      rating: "★★★★★",
      time: "1 kun oldin",
      comment: "Kurs juda foydali, ko'p yangi narsalarni o'rgandim!",
    },
    {
      name: "Javlonbek Ergashev",
      rating: "★★★★☆",
      time: "2 kun oldin",
      comment:
        "Darslar yaxshi, lekin ba'zi joylarda tushuntirishlar etarli emas.",
    },
    {
      name: "Nigora Akhmedova",
      rating: "★★★☆☆",
      time: "3 kun oldin",
      comment: "Kurs yaxshi, lekin ko'proq misollar va amaliyot kerak.",
    },
    {
      name: "Oybek Karimov",
      rating: "★★★★★",
      time: "4 kun oldin",
      comment: "Juda yaxshi kurs, ko'plab foydali bilimlar olish mumkin!",
    },
  ];

  return (
    <Layout>
      <div className="flex items-center gap-2">
        <span
          className={`cursor-pointer text-gray-500 hover:text-gray-300 transition-all`}
        >
          Bosh sahifa
        </span>{" "}
        <FaAngleRight className="text-gray-500" />{" "}
        <span
          className={`cursor-pointer text-gray-500 hover:text-gray-300 transition-all`}
        >
          Kurslar
        </span>{" "}
        <FaAngleRight className="text-gray-500" />
        <span>Murakkab Backend</span>
      </div>
      <section
        className={`flex justify-between items-center flex-col-reverse md2:flex-row lg:flex-col-reverse xl:flex-row sm:p-8 p-3 mt-[40px] ${
          mode ? "bg-gray-200" : "bg-gray-800"
        }`}
      >
        <div className="md2:w-[60%] w-full lg:w-full flex flex-col justify-between items-start gap-2">
          <h1 className="text-xl xs:text-3xl font-bold font-montserrat mt-4">
            Murakkab Backend
          </h1>
          <p
            className={`text-[12px] leading-4 font-montserrat pr-4 text-start ${
              mode ? "text-gray-800" : "text-gray-400"
            }`}
          >
            Murakkab to'liq backend kurs. Siz ushbu kursda murakkab mavzularni
            to'liq o'rganasiz. Access token va Refresh token yordamida to'liq
            avtorizatsiya, Foydalanuvchini emailga profilni aktivatsiya qilish
            uchun email yuborish, Parolni unutsa email orqali parolni tiklash,
            Middleware foydalanuvchini xolatiga ko'ra, Dasturga faqat biz
            xohlagancha user kira oladigon, ReactJS cliet qismi uchun, Zustand
            state manegment, Tanstack react query so'rovlarni optimillashtirish
            hullas eng muhim va chuqur mavzularni o'rganasizlar.
          </p>
          <div className="flex xl:items-center items-start justify-start gap-4 mt-[20px] text-[14px] flex-col xl:flex-row">
            <p className="text-blue-400">
              Davomiylik:{" "}
              <span className="text-blue-400 font-bold">10 soat 52 daqiqa</span>
            </p>
            <p className="text-blue-400">
              Darslar soni:{" "}
              <span className="text-blue-400 font-bold">35 ta</span>
            </p>
          </div>
        </div>
        <div className="md2:w-[400px] w-full  lg:w-full h-[230px]">
          <img
            src="https://www.sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fd7180d95-5960-48a9-bd2c-1e3dda377329-gnzzth.png&w=1920&q=75"
            alt="Img"
            className="w-full h-[230px] rounded-sm object-cover"
          />
        </div>
      </section>
      <section className="mt-10 flex justify-between gap-8 flex-col lg:flex-row">
        <div
          className={`${
            mode ? "bg-gray-200" : "bg-gray-800"
          } p-8 xl:w-3/5 w-full`}
        >
          <h1 className="text-2xl font-semibold font-spaceGrotesk">
            Kursda nimalarni o'rganasiz
          </h1>
          <ul className="grid grid-cols-2 gap-2 mt-4">
            {technologies.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-start gap-3 text-[14px] font-montserrat"
              >
                <BsPatchCheck className="text-blue-500 font-bold min-w-[25px] text-[20px]" />{" "}
                <span className="line-clamp-1">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-2/5 shadow-[inset_0px_0px_15px_8px_rgba(89,190,251,1)] rounded-sm flex flex-col p-8 h-[250px]">
          <h2 className="text-[25px] font-montserrat">Kurs narxi</h2>
          <h1 className="text-2xl font-bold font-spaceGrotesk">
            Bepul{" "}
            <span className="line-through text-muted-foreground text-[16px] font-normal">
              250.000 UZS
            </span>
          </h1>
          <h2
            className={`flex items-center justify-start font-bold text-orange-500`}
          >
            5.0
            <HiMiniStar className="ml-2" />
            <HiMiniStar className="" />
            <HiMiniStar className="" />
            <HiMiniStar className="" />
            <ImStarHalf className="" />
            <span
              className={`${mode ? "text-gray-700" : "text-gray-200"} ml-3`}
            >
              (50)
            </span>{" "}
            <span
              className={`${
                mode ? "text-gray-700" : "text-gray-200"
              } font-spaceGrotesk font-normal ml-3`}
            >
              1.4K o'quvchi
            </span>
          </h2>
          <hr className="w-full border-gray-700 my-4" />
          <Button
            className={`w-full text-md flex gap-3 bg-green-500 hover:bg-blue-600 rounded-sm`}
          >
            Kirish <LiaSignInAltSolid className="text-lg" />
          </Button>
        </div>
      </section>
      {/* Course contents */}
      <section className="mt-10 flex gap-8 justify-between items-center">
        <div
          className={`${
            mode ? "bg-gray-200 text-gray-600" : "bg-gray-800"
          } p-8 lg:w-3/5 w-full`}
        >
          <div>
            <h1 className="text-3xl font-bold font-montserrat">
              Kurs kontenti
            </h1>
            <div>
              <div className="flex justify-between items-center mt-4">
                {courseContent.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1">
                    {item.icon}{" "}
                    <h2 className="text-xl font-semibold font-montserrat">
                      {item.title}
                    </h2>
                    <h1 className="text-2xl font-semibold">{item.count}</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="w-full border-gray-700 my-5" />
          <div>
            <AccordionDemo />
          </div>
        </div>
        <div className="lg:w-2/5 hidden"></div>
      </section>
      {/* Who is this course for */}
      <section className="mt-10 flex gap-8 justify-between items-center">
        <div
          className={`${
            mode
              ? "bg-gray-200 text-gray-700"
              : "bg-gray-800 text-gray-200 bg-gradient-to-tl from-gray-600 to-gray-800"
          } p-8 lg:w-3/5 w-full`}
        >
          <h1 className="text-2xl font-bold font-montserrat">
            Kurs kim uchun.
          </h1>
          <ul
            className={`list-disc list-inside mt-4 space-y-1 ${
              mode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {courseForWhom.map((item) => (
              <div className="flex gap-2" key={item}>
                &bull;{" "}
                <li
                  key={item}
                  className="flex items-center justify-start gap-3 text-[14px] font-montserrat"
                >
                  {item}
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="lg:w-2/5 hidden"></div>
      </section>
      <section className="mt-10 flex gap-8 justify-between items-center">
        <div className="lg:w-3/5 w-full">
          <div className="flex items-center font-semibold text-xl justify-between pb-6">
            <h2 className="flex items-center">
              <BsFillStarFill className="text-orange-500" />
              <span className="mr-2 ml-1">5.0 Kurs baholari:</span> &bull;{" "}
              <span className="ml-2">51ta sharh</span>
            </h2>
            <TooltipDemo mode={mode} BiMessageDetail={BiMessageDetail} />
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 xs:gap-4 gap-1">
            {reviews.map((item) => (
              <div
                className="border-t pt-[20px] border-gray-600 mt-8"
                key={item.name}
              >
                <div className="flex gap-2 items-center font-montserrat">
                  <h1 className="text-2xl bg-blue-500 w-[50px] h-[50px] flex items-center justify-center rounded-full">
                    {item.name.charAt(0).toUpperCase()}
                  </h1>
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      <span className="text-orange-500">{item.rating}</span>{" "}
                      <span className="text-muted-foreground text-[13px] font-bold">
                        {" "}
                        {item.time}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[14px]">{item.comment}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-2/5 hidden"></div>
      </section>
      <section>
        <CarouselSize />
      </section>
    </Layout>
  );
};

export default CourseDetail;
