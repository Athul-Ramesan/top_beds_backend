import { IProperty } from "../entities/propertyEntity";

export interface IGetAllPropertyUseCase {
    execute(data: {
        page?: number;
        limit?: number;
        category?: string,
        priceRange?: string,
        location?: string,
        guestCount?: string
        search?: string;
        sort?:string
    }): Promise<IProperty[] | null>;
}