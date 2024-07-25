import { NextFunction, Request, Response } from "express";
import { updateSubscriptionData } from "../../_lib/services/updateSubscriptionData";
export const updateSubscriptionDataController =async (req: Request, res: Response, next: NextFunction)  => {

        try{
            const {id, subscriptionData } = req.body
            console.log("🚀 ~ updateSubscriptionDataController ~ id:", id)
            console.log("🚀 ~ updateSubscriptionDataController ~ subscriptionData:", subscriptionData)

            const user = await updateSubscriptionData(id,subscriptionData)
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