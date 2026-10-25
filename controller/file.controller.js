import cloudinary from "../config/cloud.config.js"
import User from "../model/auth.model.js"
import File from "../model/file.model.js"
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "file is required" });
        }

        const fileName = req.body?.fileName;
        if (!fileName) {
            return res.status(400).json({ success: false, message: "filename is required" });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "files", resource_type: "auto" },
                (error,result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);

                    }
                }
            );

            stream.end(req.file.buffer);
        });
        const file = await File.create({
            fileName: req.body.fileName,
            fileURL: result.secure_url,
            createdBy: req.user._id
        });
        await User.findByIdAndUpdate(req.user._id, { $push: { files: file._id } });
        return res.status(200).json({ success: true, msg: "file uploaded successfully", file });
    } catch (error) {
        console.error("Error uploading file:", error);
    
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
