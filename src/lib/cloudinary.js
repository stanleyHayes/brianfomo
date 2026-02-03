import {v2 as cloudinary} from "cloudinary";
import {config} from "../config/config.js";

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
});

/**
 * Upload an image to Cloudinary.
 *
 * This helper uploads an image to Cloudinary and returns the secure URL.
 * The `image` argument can be:
 * - A local file path
 * - A remote URL
 * - A Base64-encoded data URI
 *
 * Cloudinary configuration must be initialized before calling this function.
 *
 * @async
 * @function uploadImage
 *
 * @param {string} image - Image source (path, URL, or base64 data URI)
 *
 * @returns {Promise<string>} Secure URL of the uploaded image
 *
 * @throws {Error} If the upload fails
 */
export const uploadImage = async (image) => {
    const response = await cloudinary.uploader.upload(image, {
        folder: 'profile_images',
        resource_type: 'image'
    });
    return response.secure_url;
}

export const uploadImages = async (images = []) => {
    const uploads = images.map((image) =>
        cloudinary.uploader.upload(image, {
            folder: "messages",
            resource_type: "image"
        })
    );

    const results = await Promise.all(uploads);

    return results.map(r => r.secure_url);
}