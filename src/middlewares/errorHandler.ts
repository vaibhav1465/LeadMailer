import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi"; // Import Joi's error type
import { logger } from "../utils/logger";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Handle Joi validation errors
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.details.map((detail) => ({
        path: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  // Default error handling
  const status = (err as any)?.statusCode ?? 500;
  const message = (err as any)?.message ?? "Internal Server Error";

  if (status >= 500) logger.error(err);

  return res.status(status).json({ message });
}
