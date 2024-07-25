import nodemailer from "nodemailer"

export const generateEmailWithOtp = async (email: string,otp:string) => {
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
        from: "dev.athulrameshankv.ar@gmail.com",
        to: email,
        subject: "Verification code from Topbeds",
        text: "Welcome",
        html: `
        <div>
        <h3>Hello ${email}</h3>
        <p>Your otp to verify your account is below mentioned</p>
        <h1>${otp}</h1>
        If you did not make this request then just ignore it.
        </div>`
    };
    
    console.log('email sent successfully');

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new Error("email verification failed");
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}