import { Property } from "../Models/property";

export const deletePropertyRepository = async (id: string): Promise<boolean> => {
    try {
        const result = await Property.findByIdAndDelete(id)
        console.log(result);
        return true

        //// return should be changed
    } catch (error: any) {
        throw new Error(error.message);
    }
}