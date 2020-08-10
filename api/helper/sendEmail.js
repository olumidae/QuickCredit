import { config } from 'dotenv';
import sgMail from '@sendgrid/mail';

config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = (receiver, source, subject, content) => {
  try {
    const data = {
      to: receiver,
      from: source,
      subject,
      html: content,
    };
    return sgMail.send(data);
  } catch (error) {
    return new Error(error);
  }
};

export default sendMail;
