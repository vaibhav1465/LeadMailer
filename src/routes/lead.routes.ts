import { Router } from "express";
import { submitLead } from "../controllers/lead.controller";
import { emailPayloadSchema } from "../validations/lead.validation";
import { validate } from "../middlewares/validate";
import { apiRateLimiter } from "../middlewares/rateLimit";

const router = Router();

/**
 * POST /api/leads/email
 */
router.post("/email",apiRateLimiter, validate(emailPayloadSchema), submitLead);

export default router;
