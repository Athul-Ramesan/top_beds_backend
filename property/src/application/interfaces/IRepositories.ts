import { IUpdatePropertyEntity } from "@/domain/entities";
import { IProperty } from "@/domain/entities/propertyEntity";

export interface IRepositories {
    createPropertyRepository: (data: IProperty) => Promise<IProperty | null>;
    getAllPropertyRepository: (
        data: {
            page?: number;
            limit?: number;
            category?: string;
            search?: string;
        }) => Promise<IProperty[]>;
    deletePropertyRepository: (data: string) => Promise<Boolean>
    getHostIdRepository: (data: string) => string
    getHostPropertiesRepository: (hostId: string) => Promise<IProperty[]>;
    addNewPhotosRepository : (propertyId:string, images:string[]) => Promise<IProperty>;
    updatePropertyRepository: (propertyId:string,data:IUpdatePropertyEntity) => Promise<IProperty>
    deletePropertyPhotoRepository: (propertyId:string, image:string) => Promise<IProperty>
}
