import { Router } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { controllers } from "../../../presentation/controllers";

export const routes = (dependencies: IDependencies) => {
    console.log("___________inside routes");
    const {
        signup,
        login,
        logout,
        google,
        sendOtp,
        verifyOtp,
        getUserData,
    } = controllers(dependencies);

    const router = Router();
    router.route('/signup')
        .post(signup)
    router.route('/login')
        .post(login)
    router.route('/logout')
        .delete(logout)
    router.route('/googleAuth')
        .post(google)
    router.route('/verify-account/send-otp')
        .post(sendOtp)    
    router.route('/verify-account')
        .post(verifyOtp)  
    router.route('/get-user-data')
        .get(getUserData)      
    return router
}
