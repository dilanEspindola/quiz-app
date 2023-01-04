export default () => ({
  PORT: process.env.PORT,
  DATABASE: {
    HOST: <string>process.env.DB_HOST,
    PORT: process.env.DB_PORT as unknown as number,
    USERNAME: <string>process.env.DB_USERNAME,
    PASSWORD: <string>process.env.DB_PASSWORD,
    DATABASE_NAME: <string>process.env.DATABASE,
  },
  cloudinary: {
    cloud_name: <string>process.env.CLOUD_NAME,
    api_key: <string>process.env.API_KEY,
    api_secret: <string>process.env.API_SECRET,
  },
});
