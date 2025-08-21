import type { Request, Response } from "express";
import { sendLeadEmail } from "../services/lead.service";
import { logger } from "../utils/logger";

export async function submitLead(req: Request, res: Response) {
  try {
    // Already validated by middleware
    await sendLeadEmail(req.body);
    return res.status(202).json({ message: "Lead email accepted for delivery" });
  } catch (error) {
    logger.error("Failed to send lead email", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
