import { User } from "../models";
import bcrypt from 'bcryptjs'

export const verifyResetToken = async(token:string,password:string) => {
console.log("🚀 ~ verifyResetToken ~ password:", password)
console.log("🚀 ~ verifyResetToken ~ token:", token)

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
          });
          if(!user){
            throw new Error("Invalid or expired token");
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          user.password = hashedPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          
          await user.save();
          
          return true
    } catch (error: any) {
        throw new Error(error.message);
    }
}