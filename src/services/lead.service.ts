import { SendEmailCommand } from "@aws-sdk/client-sesv2";
import { sesClient } from "../config/email.config";
import path from "path";
import fs from "fs";
import ejs from "ejs";
import { logger } from "../utils/logger";
import { EmailPayload } from "../validations/lead.validation";
import { ConstantsModule } from "../constants/constants.module";

export async function sendLeadEmail(requestBody: EmailPayload) {
  try {
    // Load and render EJS template (currently static)
    const templatePath = path.join(__dirname, "../views/emailTemplate.ejs");

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found at path: ${templatePath}`);
    }

    const templateContent = fs.readFileSync(templatePath, "utf-8");
    const htmlBody = ejs.render(templateContent, requestBody); // Pass payload for future dynamic content

    const textBody = requestBody.message; // Fallback to plain text message
    const subject = requestBody.subject;
    const emails = requestBody.emails;
    console.log('emails: ', emails);
    const senderEmail = process.env.SES_SENDER ;
    console.log('senderEmail: ', senderEmail);

    const command = new SendEmailCommand({
      FromEmailAddress:senderEmail,
      Destination: {
        ToAddresses: [requestBody.emails[0]], // Assuming you want to send to the first email in the arrays,
      },
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Html: { Data: htmlBody, Charset: "UTF-8" },
            Text: { Data: textBody, Charset: "UTF-8" },
          },
        },
      },
    });

    const result = await sesClient.send(command);
    logger.info("Lead email sent successfully", result);

    await sendDefaultLeadEmail(requestBody); // Call default email function for static template
   
    return result;

  } catch (error) {
    logger.error("Failed to send lead email", error);
    throw new Error(`Failed to send lead email: ${(error as Error).message}`);
  }
}

export async function sendDefaultLeadEmail(requestBody: EmailPayload) {
  try {
    // Load and render EJS template (currently static)
    const templatePath = path.join(__dirname, "../views/defaultEmailTemplate.ejs");

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found at path: ${templatePath}`);
    }

    const templateContent = fs.readFileSync(templatePath, "utf-8");
    const htmlBody = ejs.render(templateContent,requestBody); // Pass payload for future dynamic content

    const textBody = requestBody.message; // Fallback to plain text message
    const subject = requestBody.subject;
    const emails = ConstantsModule.DEFAULT_EMAIL_ADDRESSES;
    console.log('emails: ', emails);
    const senderEmail = process.env.SES_SENDER ;
    console.log('senderEmail: ', senderEmail);
    const results = [];

  for (const recipient of emails) {
    try {
      const command = new SendEmailCommand({
        FromEmailAddress: senderEmail,
        Destination: {
          ToAddresses: [recipient], // one recipient at a time
        },
        Content: {
          Simple: {
            Subject: { Data: subject, Charset: "UTF-8" },
            Body: {
              Html: { Data: htmlBody, Charset: "UTF-8" },
              Text: { Data: textBody, Charset: "UTF-8" },
            },
          },
        },
      });

      const response = await sesClient.send(command);
      logger.info(`Email sent successfully to ${recipient}`, response);
      results.push({ recipient, status: "success", response });

    } catch (error) {
      logger.error(`Failed to send email to ${recipient}`, error);
      results.push({ recipient, status: "failed", error: (error as Error).message });
    }
  }

  return results;

  } catch (error) {
    logger.error("Failed to send lead email", error);
    throw new Error(`Failed to send lead email: ${(error as Error).message}`);
  }
}

