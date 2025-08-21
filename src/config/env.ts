import dotenv from "dotenv";
dotenv.config();

const required = (value: string | undefined, key: string) => {
  if (!value) throw new Error(`Missing required env: ${key}`);
  return value;
};

export const env = {
  NODE_ENV: process.process.env.NODE_ENV ?? "development",
  PORT: Number(process.process.env.PORT ?? 3000),

  AWS_REGION: required(process.process.env.AWS_REGION, "AWS_REGION"),
  AWS_ACCESS_KEY_ID: process.process.env.AWS_ACCESS_KEY_ID, // optional when using IAM role
  AWS_SECRET_ACCESS_KEY: process.process.env.AWS_SECRET_ACCESS_KEY, // optional when using IAM role

  SES_SENDER: required(process.process.env.SES_SENDER, "SES_SENDER"),
  LEAD_INBOX: required(process.process.env.LEAD_INBOX, "LEAD_INBOX"),
};
