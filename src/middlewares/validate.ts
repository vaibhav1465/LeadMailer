import type { Request, Response, NextFunction } from "express";
import type Joi from "joi";

export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((d) => ({
          path: d.path,
          message: d.message,
        })),
      });
    }

    req.body = value; // assign validated value back
    next();
  };
