export default {
  port: process.env.PORT,
  dbURI:
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_DB
      : process.env.NODE_ENV === "test"
        ? process.env.TEST
        : process.env.PRODUCTION_DB,
  accessTokenPrivateKey: process.env.ACCESSTOKEN,
  refreshTokenPrivateKey: process.env.REFRESHTOKEN,
};
