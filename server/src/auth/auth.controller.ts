import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { CreateUserDto } from "./dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private authService: AuthService,
  ) {}

  @Post("register")
  @UseInterceptors(FileInterceptor("photo"))
  async registerUser(
    @Body(ValidationPipe) userData: CreateUserDto,
    @Res() res: Response,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    try {
      const image = await this.cloudinaryService.uploadImage(photo);
      const user = await this.authService.createUser({
        ...userData,
        photo: image.secure_url,
      });

      return res.status(HttpStatus.OK).json({ message: "registered", user });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "INTERNAL_SERVER_ERROR",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
