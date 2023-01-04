import { v2 } from "cloudinary";

export const CloudinaryProvider = {
  provide: "Cloudinary",
  useFactory: () => {
    return v2.config({
      cloud_name: "dp9zv16le",
      api_key: "678176359596625",
      api_secret: "o3S6cGOndTzma0WwwwfX8Hx7tVA",
    });
  },
};
