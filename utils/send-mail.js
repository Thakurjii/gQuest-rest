"use strict";
const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GQUEST_MAIL_ID, 
    pass: process.env.GQUEST_MAIL_PASSWORD
  }
})