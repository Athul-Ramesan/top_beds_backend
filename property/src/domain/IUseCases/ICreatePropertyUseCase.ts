import { IProperty } from "../entities/propertyEntity";

export interface ICreatePropertyUseCase{

    execute(data:IProperty): Promise<IProperty | null>
}