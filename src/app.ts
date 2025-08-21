import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import leadRoutes from "./routes/lead.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/leads", leadRoutes);

// central error handler (keep last)
app.use(errorHandler);

export default app;
