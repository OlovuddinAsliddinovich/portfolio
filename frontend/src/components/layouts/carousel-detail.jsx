import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { IMG_URL } from "@/services";

export function CarouselSize({ courses }) {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1,
        speed: 500,
      }}
      className="w-full mt-[40px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {courses.map((course, index) => (
          <CarouselItem key={course._id} className="md:basis-1/2 lg:basis-1/3">
            <img
              src={`${IMG_URL}/course-images/${course?.image}`}
              alt={`img`}
              className="w-full h-[200px] object-cover border border-gray-700 rounded-sm"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
