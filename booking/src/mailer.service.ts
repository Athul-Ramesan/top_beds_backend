import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendBookingConfirmation(booking: any, userEmail: string) {
    const mailOptions = {
      from: '"Your Company" <noreply@yourcompany.com>',
      to: userEmail,
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear Guest,</p>
        <p>Your booking has been confirmed. Here are the details:</p>
        <ul>
          <li>Booking ID: ${booking._id}</li>
          <li>Property: ${booking.property}</li>
          <li>Check-in: ${booking.startDate}</li>
          <li>Check-out: ${booking.endDate}</li>
          <li>Total Price: $${booking.totalPrice}</li>
        </ul>
        <p>Thank you for choosing our service!</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Booking confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending booking confirmation email:', error);
    }
  }
}