import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import hero from "../lib/db/carousel.json";
import ProductSection from "./section/product-section";

type AutoplayPlugin = {
  stop: () => void;
  reset: () => void;
};
const Home = () => {
  const plugin: any = useRef<AutoplayPlugin>(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <div className="flex flex-col">
      <section className="flex justify-center py-5" >
        <Carousel className="w-full"
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {hero.map((item, index) => (
              <CarouselItem key={index}>
                <img src={item.image} className="object-cover w-full h-[500px] rounded-lg" alt="" />
              </CarouselItem>

            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <ProductSection />
    </div>
  );
};

export default Home;
