import { sendPasswordResetEmail } from "../../../_lib/verification/sendPasswordResetEmail"
import { User } from "../models"
import crypto from 'crypto'

export const emailVerification = async (email: string) => {
    console.log("🚀 ~ emailVerification ~ email:", email)
    
    try {
        const user = await User.findOne({email:email})
        if (!user) {
            throw new Error("Email not found");
        }
        const resetToken = crypto.randomBytes(20).toString('hex')
        user.resetPasswordToken = resetToken;
        const expirationDuration = 3600000;
        user.resetPasswordExpires = new Date(Date.now() + expirationDuration);

        user.save()

        await sendPasswordResetEmail(email,resetToken)
        
    } catch (error: any) {
        throw new Error(error);
    }
}