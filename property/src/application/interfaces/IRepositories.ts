import { IProperty } from "@/domain/entities/propertyEntity";

export interface IRepositories{
    createPropertyRepository: (data:IProperty)=>Promise<IProperty |null>;
    getAllPropertyRepository:()=>Promise<IProperty[]>;
    deletePropertyRepository:(data:string)=>Promise<Boolean>
    getHostIdRepository:(data:string)=> string
    getHostPropertiesRepository :(hostId:string) => Promise<IProperty[]>;
}
