const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, data, topic) {
    this.to = user.email;
    this.topic = topic;
    this.firstName = user.name.split(' ')[0];
    this.data = data;
    this.from = `${process.env.COMPANY_NAME} <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   // Sendgrid
    //   return nodemailer.createTransport({
    //     service: 'SendGrid',
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_PASSWORD
    //     }
    //   });
    // }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      data: this.data,
      topic: this.topic,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'TEAM ADLET: Welcome to the Adlet Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'TEAM ADLET: Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendId() {
    await this.send('sendId', 'TEAM ADLET: HERE IS YOUR ID');
  }
};
