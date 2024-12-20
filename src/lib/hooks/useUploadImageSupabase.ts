import supabase from "@/lib/supabase";

export const useUploadImage = async (file: File): Promise<string | null> => {
    if (!file) {
        console.error("No file selected!");
        return null;
    }

    const now = Date.now().toString();
    const filePath = `uploads-${now.slice(now.length - 4)}-${file.name.slice(0, 3)}`;

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