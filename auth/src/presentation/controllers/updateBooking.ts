import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { customError,IUserPayload} from 'topbeds-package'
import { updateSubscriptionData } from "../../_lib/services/updateSubscriptionData";
import { updateBooking } from "../../_lib/services/updateBooking";
export const updateBookingController =async (req: Request, res: Response, next: NextFunction)  => {

        try{
            const {id, booking } = req.body
            console.log("🚀 ~ updateBookingController ~ booking:", booking)
            console.log("🚀 ~ updateSubscriptionDataController ~ id:", id)

            const user = await updateBooking(id,booking)
            if (user) {
                res.status(200).json({ status: 'ok', data: user })
            } else {
                res.status(400).json({ status: false, message: "couldn't get user data" })
            }
        } catch (error: any) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message })
        }
    
}