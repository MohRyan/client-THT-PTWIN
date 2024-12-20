import supabase from "../supabase";

export const useDeleteImageProduct = async (filePath: string): Promise<boolean> => {
    if (!filePath) {
        console.error("File path is required!");
        return false;
    }

    try {
        const { error } = await supabase.storage
            .from('THT-PTWIN') // Ganti dengan nama bucket Anda
            .remove([filePath]);

        if (error) {
            console.error("Failed to delete file:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error during delete:", err);
        return false;
    }
};