# Email Service API

A **Node.js + Express + TypeScript** API for sending emails using **AWS SES** with support for **HTML templates (EJS)** and **Joi validation**.

---

## Features

- Send emails via **AWS SES**.
- Support for **HTML email templates** using **EJS**.
- **Payload validation** with **Joi**.
- **Error handling and logging** with custom logger.
- **Rate limiting** support per API route.
- TypeScript types for safer development.

---

## Requirements

- Node.js v18+  
- AWS account with SES access
- Verified sender email in SES (sandbox mode requires recipient emails verified)

---

## Installation

```bash
git clone <git@github.com:vaibhav1465/LeadMailer.git>
cd <LeadMailer>
npm install


# Create a .env file in the root:
NODE_ENV=development
SES_SENDER=your-verified-sender@example.com
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
DEFAULT_EMAIL_ADDRESSES = [] # Add Your Email Address 
PORT=3000


# Running the Project
# Development
npm run dev

# Build & Production
npm run build
npm start