import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as passport from "passport";
import { TypeormStore } from "connect-typeorm/";
import * as dayjs from "dayjs";
import { AppModule } from "./app.module";
import { Session } from "./models";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app
    .get(AppModule)
    .getDataSource()
    .getRepository(Session);

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
        maxAge: dayjs().add(2, "minutes").toDate(),
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
