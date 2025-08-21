import Joi from "joi";
import { EmailType } from "../constants/enums";

// Define TypeScript interface for the payload
export interface EmailPayload {
  emails: string[];
  emailType: EmailType;
  subject: string;
  message: string;
}

// Joi validation schema
export const emailPayloadSchema = Joi.object<EmailPayload>({
  emails: Joi.array()
    .items(Joi.string().email().required())
    .min(1)
    .required()
    .messages({
      'array.base': '"emails" must be an array',
      'array.min': '"emails" must contain at least one email',
      'string.email': 'Each item in "emails" must be a valid email address',
      'any.required': '"emails" is required',
    }),

  emailType: Joi.string()
    .valid(...Object.values(EmailType))
    .required()
    .messages({
      'any.only': `"emailType" must be one of ${Object.values(EmailType).join(', ')}`,
      'any.required': '"emailType" is required',
    }),

  subject: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.base': '"subject" must be a string',
      'string.empty': '"subject" cannot be empty',
      'any.required': '"subject" is required',
    }),

  message: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.base': '"message" must be a string',
      'string.empty': '"message" cannot be empty',
      'any.required': '"message" is required',
    }),
});
