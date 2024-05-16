import { ObjectId } from "mongoose";
import { Property } from "../Models/property";

export const deleteProperty = async (id: ObjectId): Promise<boolean> => {
    try {
        const result = await Property.findByIdAndDelete(id)
        console.log(result);
        return true

        //// return should be changed
    } catch (error: any) {
        throw new Error(error.message);
    }
}