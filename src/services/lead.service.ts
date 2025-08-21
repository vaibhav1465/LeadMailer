import { SendEmailCommand } from "@aws-sdk/client-sesv2";
import { sesClient } from "../config/email.config";
import path from "path";
import fs from "fs";
import ejs from "ejs";
import { logger } from "../utils/logger";
import { EmailPayload } from "../validations/lead.validation";

export async function sendLeadEmail(requestBody: EmailPayload) {
    try {
        // Load and render EJS template (currently static)
        const templatePath = path.join(__dirname, "../views/emailTemplate.ejs");

        if (!fs.existsSync(templatePath)) {
            throw new Error(`Email template not found at path: ${templatePath}`);
        }

        const templateContent = fs.readFileSync(templatePath, "utf-8");
        const htmlBody = ejs.render(templateContent, requestBody); // Pass payload for future dynamic content

        const subject = requestBody.subject;
        const emails = requestBody.emails;
        console.log('emails: ', emails);
        const senderEmail = process.env.SES_SENDER;
        console.log('senderEmail: ', senderEmail);

        const command = new SendEmailCommand({
            FromEmailAddress: senderEmail,
            Destination: {
                ToAddresses: [...requestBody.emails], // Assuming you want to send to the first email in the arrays,
            },
            Content: {
                Simple: {
                    Subject: { Data: subject, Charset: "UTF-8" },
                    Body: {
                        Html: { Data: htmlBody, Charset: "UTF-8" },
                    },
                },
            },
        });

        const result = await sesClient.send(command);
        logger.info("Lead email sent successfully", result);

        // If you want to send to a default email as well, you can do that here
        // Assuming you have a default email address set in environment variables
        const defaultEmails: string[] = JSON.parse(process.env.DEFAULT_EMAIL_ADDRESSES || "[]");
        console.log('defaultEmails: ', defaultEmails);
        if (defaultEmails.length) {
            console.log('emails: ', defaultEmails);
            // Default email sending logic
            const command = new SendEmailCommand({
                FromEmailAddress: senderEmail,
                Destination: {
                    ToAddresses: [...defaultEmails], // Assuming you want to send to the first email in the arrays,
                },
                Content: {
                    Simple: {
                        Subject: { Data: subject, Charset: "UTF-8" },
                        Body: {
                            Html: { Data: htmlBody, Charset: "UTF-8" },
                        },
                    },
                },
            });

            const result = await sesClient.send(command);
            logger.info("Lead email sent successfully for default emails", result)
        }

        return result;

    } catch (error) {
        logger.error("Failed to send lead email", error);
        throw new Error(`Failed to send lead email: ${(error as Error).message}`);
    }
}

