import { NestFactory } from "@nestjs/core";
import { TypeormStore } from "connect-typeorm/";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as passport from "passport";
import { AppModule } from "./app.module";
import { Session } from "./models";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionRepository = app
    .get(AppModule)
    .getDataSource()
    .getRepository(Session);

  app.setGlobalPrefix("api");

  app.enableCors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "*",
  });
  app.use(cookieParser());
  app.use(
    session({
      name: "SESSION",
      secret: "KHJKHJKHjkhjkhkjhKHKJH",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
