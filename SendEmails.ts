import nodemailer from 'nodemailer';
import * as fs from 'fs';

// Load emails from JSON file
const loadEmails = (filePath: string): string[] => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data); // Since emails.json is an array, no need for .emails
};

// Send email function
const sendEmail = async (recipient: string) => {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: 'your-email@gmail.com', // Your email
      pass: 'your-email-password', // Your email password

      // Note: If using Gmail, enable App Passwords for enhanced security.
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: recipient, // List of recipients
    subject: 'Hello from brihi houssame', // Subject line
    text: 'This is a test email sent using TypeScript and Nodemailer by brihi houssame!', // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipient}: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email to ${recipient}:`, error);
  }
};

// Main function
const main = async () => {
  const emails = loadEmails('emails.json');

  // Send email to each email in the JSON file
  for (const email of emails) {
    await sendEmail(email);
  }
};

main().catch(console.error);
