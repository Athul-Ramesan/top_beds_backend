import { IProperty } from "@/domain/entities/propertyEntity";

export interface IRepositories{
    createPropertyRepository: (data:IProperty)=>Promise<IProperty |null>;
    getAllPropertyRepository:()=>Promise<IProperty[]>
}