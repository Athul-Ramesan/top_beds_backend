import { IProperty } from "../entities/propertyEntity";

export interface IGetAllPropertyUseCase{
    execute(): Promise<IProperty[] | null>;
}