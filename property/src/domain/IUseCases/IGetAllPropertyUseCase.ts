import { IProperty } from "../entities/propertyEntity";

export interface IGetAllPropertyUseCase{
    execute(data: {
        page?: number;
        limit?: number;
        category?: string;
        search?: string;
    }): Promise<IProperty[] | null>;
}