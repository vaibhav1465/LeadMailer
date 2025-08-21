import rateLimit from "express-rate-limit";

// Limit each IP to 10 requests per minute (adjust as needed)
export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000,                  // limit each IP to 10 requests per window
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,    // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,     // Disable `X-RateLimit-*` headers
});
