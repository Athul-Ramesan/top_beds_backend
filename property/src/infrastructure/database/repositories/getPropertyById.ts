import { IProperty } from "@/domain/entities/propertyEntity";
import { ObjectId } from "mongoose";
import { Property } from "../Models/property";

export const getPropertyById = async (data: ObjectId): Promise<IProperty> => {
    try {
        const property = await Property.findOne({ _id: data }).populate("hostId")
        console.log("🚀 ~ getPropertyById ~ property:", property?.hostId)
        if (!property) {
            throw new Error("Property finding error");
        }
        return property;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}
