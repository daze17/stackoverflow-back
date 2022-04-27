export const config = {
    HOST: process.env.HOST || "0.0.0.0",
    PORT: process.env.PORT || 4000,
    APP_SECRET: process.env.APP_SECRET || "secret_password",
    GRAPHQL_PATH: process.env.GRAPHQL_PATH || "/api/graphql",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
    MAIN_APP_DOMAIN: process.env.MAIN_APP_DOMAIN || "http://localhost:3000",
  };