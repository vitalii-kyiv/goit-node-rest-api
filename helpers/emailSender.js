import sgMail from "@sendgrid/mail";

const { SEND_GRID_API, SENDER_GMAIL } = process.env;

sgMail.setApiKey(SEND_GRID_API);

const emailSender = async (msg) => {
  const email = { ...msg, from: SENDER_GMAIL };
  try {
    await sgMail.send(email);
  } catch (error) {
    console.log(error);

    if (error.response) {
      console.log(error.response.body);
    }
  }
};

export default emailSender;
