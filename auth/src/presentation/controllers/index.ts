import { IDependencies } from "../../application/interfaces/IDependencies";
import { forgotPasswordController } from "./forgotPassword";
import { getUserDataController } from "./getUserData";
import { googleSignupOrLogin } from "./googleSignup";
import { loginController } from "./login";
import { logoutController } from "./logout";
import { resetPasswordController } from "./resetPassword";
import { sendOtpController } from "./sendOtp";
import { signupController } from "./signup";
import { verifyOtpController } from "./verifyAccount";

export const controllers = (dependencies: IDependencies)=>{
    console.log('inside index of controllers');
    return {
        signup: signupController(dependencies),
        login: loginController(dependencies),
        logout:logoutController(dependencies),
        google:googleSignupOrLogin(dependencies),
        sendOtp:sendOtpController(dependencies),
        verifyOtp:verifyOtpController(dependencies),
        getUserData:getUserDataController(dependencies),
        forgotPassword: forgotPasswordController(dependencies),
        resetPassword: resetPasswordController(dependencies)
    }
}
