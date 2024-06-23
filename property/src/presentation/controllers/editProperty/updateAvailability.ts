
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Property } from "@/infrastructure/database/Models/property";
import { propertyUpdatedProducer } from "@/infrastructure/messages/kafka/producer/propertyUpdatedProducer";
import { validateUpdatePropertyData } from "@/lib/validation/validateGeneralPropertyData";
import { NextFunction, Request, Response } from "express";
import { customError } from "topbeds-package";


export const updateAvailabilityController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        console.log('inside update availability controller 👏👏👏👏👏👏👏👏')
        const { propertyId, availability } = req.body
        console.log("🚀 ~ updateAvailabilityController ~ availability:", availability)
        console.log("🚀 ~ updateAvailabilityController ~ propertyId:", propertyId)
        if (!propertyId || !availability) {
            console.log('inside availability controller no requests found')
            res.status(403).json({ message: 'no request data found' })
        }
        const updatedProperty = await Property.findByIdAndUpdate(
            { _id: propertyId },
            {$set: {availability}}
        )
        console.log("🚀 ~ updateAvailabilityController ~ updatedProperty:", updatedProperty)
        if (!updatedProperty) {
            res.status(400).json({ message: "No property found" })
        }



    } catch (error: any) {
        console.log("🚀 ~ file: createPropertyController.ts ~ line 21 ~ error", error)

        next(error)
    }

}
