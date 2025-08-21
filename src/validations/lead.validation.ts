import Joi from "joi";

// Define TypeScript interface for the payload
export interface EmailPayload {
  emails: string[];
  subject: string;
  downloadFileUrl: string;
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

  subject: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.base': '"subject" must be a string',
      'string.empty': '"subject" cannot be empty',
      'any.required': '"subject" is required',
    }),

  downloadFileUrl: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.base': '"downloadFileUrl" must be a string',
      'string.empty': '"downloadFileUrl" cannot be empty',
      'any.required': '"downloadFileUrl" is required',
    }),
});
