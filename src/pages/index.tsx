import supabase from "@/lib/supabase";
import { ChangeEvent, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAppSelector } from "@/redux";
import Autoplay from "embla-carousel-autoplay"
import { getProductAll } from "@/lib/api/call/product";
import hero from "../lib/db/carousel.json";
import ProductSection from "./section/product-section";

const uploadImage = async (file: File): Promise<string | null> => {
  if (!file) {
    console.error("No file selected!");
    return null;
  }

  const filePath = `uploads-${Date.now()}_${file.name}`; // Unique file path

  try {
    const { data, error } = await supabase.storage
      .from('THT-PTWIN') // Replace with your bucket name
      .upload(filePath, file);

    if (error) {
      console.error("Upload failed:", error.message);
      return null;
    }

    console.log("File uploaded successfully:", data);

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('THT-PTWIN')
      .getPublicUrl(filePath);

    console.log("Public URL:", publicData.publicUrl);
    return publicData.publicUrl;
  } catch (err) {
    console.error("Unexpected error during upload:", err);
    return null;
  }
};
const Home = () => {

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      console.log("Uploaded File URL:", url);
    }
  };




  const plugin: any = useRef<AutoplayPlugin>(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  type AutoplayPlugin = ReturnType<typeof Autoplay>;

  return (
    <div className="flex flex-col">
      <section className="flex justify-center py-5" id="hero">
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
      <section className="h-screen" id="hero2">
        Moh
      </section>
      <section className="h-screen" id="hero3">
        Ryan
      </section>
    </div>
  );
};

export default Home;
