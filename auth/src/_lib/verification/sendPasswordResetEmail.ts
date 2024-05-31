import nodemailer from 'nodemailer'

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {

    console.log('inside sendemail')
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "dev.athulrameshan@gmail.com",
            pass: process.env.GOOGLE_PASSWORD
        }
    })
    const mailOptions = {
        from: 'dev.athulrameshankv.ar@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) has requested to reset your password.
    
        Please visit the following link to reset your password:
        ${String(process.env.BASE_URL_FRONTEND)}/auth/reset-password/${resetToken}
    
        If you did not request this, please ignore this email and your password will remain unchanged.`,
    };
    await transporter.sendMail(mailOptions);
}