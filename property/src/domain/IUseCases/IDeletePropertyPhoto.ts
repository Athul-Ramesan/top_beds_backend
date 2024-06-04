import { IProperty } from "../entities/propertyEntity";


export interface IDeletePropertyPhotoUseCase {
    execute(propertyId:string,image:string): Promise<IProperty |null>
}