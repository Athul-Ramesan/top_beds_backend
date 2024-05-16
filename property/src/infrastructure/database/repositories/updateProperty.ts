import { IProperty } from "@/domain/entities/propertyEntity";
import { ObjectId } from "mongoose";
import { Property } from "../Models/property";

export const updateProperty = async(id: ObjectId, data: IProperty): Promise<IProperty> => {
    try {

        const updatedProperty = await Property.findByIdAndUpdate(id, data, { new: true })
        if (!updatedProperty) {
            throw new Error("No property found");
        }
        return updatedProperty
    } catch (error: any) {
        throw new Error(error.message);
    }
}