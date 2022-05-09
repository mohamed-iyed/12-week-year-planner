import { Swiper, SwiperSlide } from "swiper/react";

// components
import Vision from "../../components/Vision";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper";
import Goals from "../../components/Goals";
import Tactics from "../../components/Tactics";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// slides
const slides = ["الرؤية", "الأهداف", "التكتيكات"];

// pagination
const pagination = {
  clickable: true,
  renderBullet: function (i: number, className: string) {
    return `<span class="${className} bottom-5 w-auto rounded-md h-8 px-5 py-1 text-black opacity-100">${slides[i]}</span>`;
  },
};

export default function Journey() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, []);
  return (
    <main className="w-screen h-screen px-4 py-2 bg-gray-200">
      <Swiper
        pagination={pagination}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="slides-swiper w-full h-full"
      >
        <SwiperSlide className="pb-20 md:pb-0 bg-white rounded-lg shadow p-4 overflow-auto flex flex-col gap-2">
          <Vision />
        </SwiperSlide>

        <SwiperSlide className="pb-20 md:pb-0 bg-white rounded-lg shadow p-4 overflow-auto flex flex-col gap-2">
          <Goals />
        </SwiperSlide>

        <SwiperSlide className="pb-2 md:pb-0 bg-white rounded-lg shadow p-4 overflow-auto flex flex-col gap-2">
          <Tactics />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
