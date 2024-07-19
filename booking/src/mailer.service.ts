import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { format } from 'date-fns';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "dev.athulrameshan@gmail.com",
            pass: process.env.GOOGLE_PASSWORD
        }
    });
  }

  async sendBookingConfirmation(booking: any, userEmail: string, propertyTitle: string) {
    const mailOptions = {
      from: '"TopBeds" <noreply@topbeds.com>',
      to: userEmail,
      subject: 'Booking Confirmation',
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
              h1 { color: #2c3e50; text-align: center; }
              .booking-details { background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
              .booking-item { margin-bottom: 10px; }
              .label { font-weight: bold; color: #3498db; }
              .value { color: #2c3e50; }
              .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #7f8c8d; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Booking Confirmation</h1>
              <div class="booking-details">
                <p>Dear Guest,</p>
                <p>Your booking has been confirmed. Here are the details:</p>
                <div class="booking-item">
                  <span class="label">Booking ID:</span>
                  <span class="value">${booking._id}</span>
                </div>
                <div class="booking-item">
                  <span class="label">Property:</span>
                  <span class="value">${propertyTitle}</span>
                </div>
                <div class="booking-item">
                  <span class="label">Check-in:</span>
                  <span class="value">${format(new Date(booking.startDate), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div class="booking-item">
                  <span class="label">Check-out:</span>
                  <span class="value">${format(new Date(booking.endDate), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div class="booking-item">
                  <span class="label">Number of Guests:</span>
                  <span class="value">${booking.guests}</span>
                </div>
                <div class="booking-item">
                  <span class="label">Total Price:</span>
                  <span class="value">$${booking.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <p>Thank you for choosing our service!</p>
              <div class="footer">
                If you have any questions, please don't hesitate to contact us.
              </div>
            </div>
          </body>
        </html>
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