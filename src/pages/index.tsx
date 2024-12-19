import supabase from "@/lib/supabase";
import { ChangeEvent } from "react";
import { jwtDecode } from "jwt-decode";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk4MTEzMzIxLWU4ZWQtNDczYy1iN2Y1LTc0YjQyMWIxMjdkNiIsImlhdCI6MTczNDU0OTkyOCwiZXhwIjoxNzM0NzIyNzI4fQ.jVYMMPXBNsCXbdbWNnXGbXwgsrpGXeIkD7aAp7FZm9M"
  const decoded: { id: string } = jwtDecode(token);
  console.log("🚀 ~ LandingPage ~ decoded:", decoded.id)
  return (
    <div className="flex flex-col">
      <section className="h-screen" id="hero">
        <Carousel>
          <CarouselContent>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section className="h-screen" id="hero1">
        Saya
      </section>
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
