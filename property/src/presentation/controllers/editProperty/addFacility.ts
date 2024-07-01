import { addFacility } from "@/lib/services/addFacility";
import { NextFunction, Request, Response } from "express";


export const addFacilityController =async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {name, icon} = req.body
        if(!name){
            return res.status(400).json({message: "Name is required"})
        }
        if(!icon){
            return res.status(400).json({message: "Icon is required"})
            }
            const facility = await addFacility(name, icon)
            
            return res.status(200).json({message: "Facility added successfully", facility})
    } catch (error:any) {
        console.log("🚀 ~ addFacilityController ~ error:", error)
        throw new Error(error);
    }

}