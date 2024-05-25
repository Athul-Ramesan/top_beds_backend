import { IProperty } from "../entities/propertyEntity";

export interface IGetHostPropertiesUseCase {
    execute(hostId:string): Promise<IProperty[] | null>
}