import { IAddNewPhotos, ICreatePropertyUseCase, IDeletePropertyPhotoUseCase, IDeletePropertyUseCase, IGetAllPropertyUseCase, IGetHostIdUseCase, IGetHostPropertiesUseCase, IUpdatePropertyUseCase } from "@/domain/IUseCases";
import { IDependencies } from "./IDependencies";


export interface IUseCases{
    createPropertyUseCase:(dependencies:IDependencies)
    =>ICreatePropertyUseCase;

    getAllPropertyUseCase:(dependencies:IDependencies)=>IGetAllPropertyUseCase;

    deletePropertyUseCase:(dependencies:IDependencies)=>IDeletePropertyUseCase;
    getHostIdUseCase: (dependencies:IDependencies) => IGetHostIdUseCase
    getHostPropertiesUseCase: (dependencies:IDependencies)=> IGetHostPropertiesUseCase
    addNewPhotosUseCase : (dependencies:IDependencies)=> IAddNewPhotos;
    updatePropertyUseCase : (dependecies:IDependencies)=>IUpdatePropertyUseCase;
    deletePropertyPhotoUseCase: (dependencies:IDependencies)=> IDeletePropertyPhotoUseCase;
}