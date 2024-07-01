import { addFacility } from "@/lib/services/addFacility";
import { deleteFacility } from "@/lib/services/delteFacility";
import { NextFunction, Request, Response } from "express";


export const deleteFacilityController =async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {_id} = req.params
        if(!_id){
            return res.status(400).json({message: "id is required"})
        }
            const facility = await deleteFacility(_id)
            
            return res.status(200).json({message: "Facility deleted successfully", facility})
    } catch (error:any) {
        console.log("🚀 ~ addFacilityController ~ error:", error)
        throw new Error(error);
    }

}