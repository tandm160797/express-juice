import nodeMailer from 'nodemailer';

const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USERNAME;
const pass = process.env.MAIL_PASSWORD;

const mailer = {
	send: (to, subject, html) => {
		const transporter = nodeMailer.createTransport({
			host,
			port,
			secure: true,
			auth: { user, pass }
		});
		const options = { from: user, to, subject, html };
		return transporter.sendMail(options);
	}
};

export default mailer;
