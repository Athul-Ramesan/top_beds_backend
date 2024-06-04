import { IUpdatePropertyEntity } from "../entities";
import { IProperty } from "../entities/propertyEntity";

export interface IUpdatePropertyUseCase {
    execute(propertyId:string,data:IUpdatePropertyEntity):Promise<IProperty>
}