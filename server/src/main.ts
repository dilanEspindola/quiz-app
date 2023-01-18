import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "*",
  });
  app.use(cookieParser());

  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
