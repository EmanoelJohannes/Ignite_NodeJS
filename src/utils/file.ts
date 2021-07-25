import fs from "fs";

export const deleteFile = async (filename: string) => {
    try {
        await fs.promises.unlink(filename);
    } catch {
        return;
    }

}