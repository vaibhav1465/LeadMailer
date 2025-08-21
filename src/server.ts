import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import { logger } from "./utils/logger";

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server listening on http://localhost:${process.env.PORT} (${process.env.NODE_ENV})`);
});

process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});
process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
