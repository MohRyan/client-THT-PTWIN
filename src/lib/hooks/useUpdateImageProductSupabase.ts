import supabase from "../supabase";

export const useUpdateImage = async (filePath: string, newFile: File): Promise<string | null> => {
    if (!filePath || !newFile) {
        console.error("File path and new file are required!");
        return null;
    }

    try {
        // Step 1: Delete the old file
        const { error: deleteError } = await supabase.storage
            .from('THT-PTWIN') // Ganti dengan nama bucket Anda
            .remove([filePath]);

        if (deleteError) {
            console.error("Failed to delete old file:", deleteError.message);
            return null;
        }
        console.log("Old file deleted successfully.");

        // Step 2: Upload the new file
        const now = Date.now().toString();
        const newFilePath = `uploads-${now.slice(now.length - 4)}-${newFile.name.slice(0, 3)}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('THT-PTWIN')
            .upload(newFilePath, newFile);

        if (uploadError) {
            console.error("Failed to upload new file:", uploadError.message);
            return null;
        }
        console.log("New file uploaded successfully:", uploadData);

        // Step 3: Get public URL for the new file
        const { data: publicData } = supabase.storage
            .from('THT-PTWIN')
            .getPublicUrl(newFilePath);

        return publicData.publicUrl;
    } catch (err) {
        console.error("Unexpected error during update:", err);
        return null;
    }
};
