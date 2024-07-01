import { getAllFacilities } from "@/lib/services/getAllFacilities";
import { NextFunction, Request, Response } from "express";


export const getAllFacilitiesController =async(req: Request, res: Response, next: NextFunction)=>{
    try {
        console.log('call inside controller of get all facilities')
            const facilities = await getAllFacilities()
            
            return res.status(200).json({message: "facilites deleted successfully", facilities})
    } catch (error:any) {
        console.log("🚀 ~ addFacilityController ~ error:", error)
        throw new Error(error);
    }

}