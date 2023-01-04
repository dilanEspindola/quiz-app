import { Injectable } from "@nestjs/common";
import toStream = require("buffer-to-stream");
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2,
} from "cloudinary";

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const options: UploadApiOptions = {
      public_id: file.filename,
      unique_filename: true,
      overwrite: false,
      upload_preset: "quiz-app-images",
    };

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(options, (err, result) => {
        if (err) return reject(reject);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
