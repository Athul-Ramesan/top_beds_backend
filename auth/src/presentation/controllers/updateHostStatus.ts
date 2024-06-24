import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { passwordValidation } from "../../_lib/validation"
import { customError } from "topbeds-package"
import resetPasswordProducer from "../../infrastructure/database/messages/kafka/producers/resetPasswordProducer"
import { changeHostStatus } from "../../_lib/services/changeHostStatus"

export const changeHostStatusController =async  (req: Request, res: Response, next: NextFunction)=>{

        try {

            const {_id, hostStatus} = req.body

            const result = await changeHostStatus(_id, hostStatus)
            console.log("🚀 ~ changeHostStatusController ~ result:", result)
            // if(error) return new customError(error.message,400)

            res.status(200).json({message:"host status changed successfully"})
            
        } catch (error:any) {
            res.status(400).json({message:error.message})
        }
}