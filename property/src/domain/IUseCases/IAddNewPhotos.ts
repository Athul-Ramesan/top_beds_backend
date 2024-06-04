import { IProperty } from "../entities/propertyEntity";

export interface IAddNewPhotos {
    execute(propertyId:string,images:string[]):Promise<IProperty>
}