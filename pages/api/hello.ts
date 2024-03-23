// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../lib/Google/GmailHandler";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const emailMessage = {
    to: "recipient@example.com",
    from: "sender@example.com",
    subject: "Hello from Gmail API",
    body: "This is the email content.",
  };

  // Encode the email message as base64url
  const rawEmail = Buffer.from(JSON.stringify(emailMessage)).toString(
    "base64url"
  );
  sendEmail(rawEmail);
  res.status(200).json({ name: "John Doe" });
}
