import { Router } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { controllers } from "../../../presentation/controllers";
import {isUserCheck} from 'topbeds-package'
import { changeHostStatusController } from "../../../presentation/controllers/updateHostStatus";
import { updateSubscriptionDataController } from "../../../presentation/controllers/updateSubscription";
import { updateBookingController } from "../../../presentation/controllers/updateBooking";
// import { isUserCheck } from "../../../_lib/middleware/isUserCheck";

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
        forgotPassword,
        resetPassword,
        updateUserData
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
        .get(isUserCheck,getUserData)   
    router.route('/forgot-password')  
        .post(forgotPassword)     
    router.route('/change-host-status')
        .patch(changeHostStatusController)
    router.route('/update-subscription-data')
        .post(updateSubscriptionDataController)  
    router.route('/update-booking-data')
        .post(updateBookingController)  
    router.route('/reset-password/:token')
        .post(resetPassword)  
    router.route('/update-user-data/:_id')
        .post(updateUserData)  

    return router
}


