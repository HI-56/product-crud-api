import nodemailer from "nodemailer";
export default async function sendEamil(options) {
  //create transporter (service that will send email " gmail , mailgun ...")
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });
  //define email option (from , to, subject , message ...)
  const emailOpt = {
    from: `INVENTORY SYSTEM <${process.env.EMAIL_HOST}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //send email

  await transporter.sendMail(emailOpt);
}
