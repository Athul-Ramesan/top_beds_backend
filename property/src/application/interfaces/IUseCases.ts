import { ICreatePropertyUseCase, IDeletePropertyUseCase, IGetAllPropertyUseCase, IGetHostIdUseCase, IGetHostPropertiesUseCase } from "@/domain/IUseCases";
import { IDependencies } from "./IDependencies";


export interface IUseCases{
    createPropertyUseCase:(dependencies:IDependencies)
    =>ICreatePropertyUseCase;

    getAllPropertyUseCase:(dependencies:IDependencies)=>IGetAllPropertyUseCase;

    deletePropertyUseCase:(dependencies:IDependencies)=>IDeletePropertyUseCase;
    getHostIdUseCase: (dependencies:IDependencies) => IGetHostIdUseCase
    getHostPropertiesUseCase: (dependencies:IDependencies)=> IGetHostPropertiesUseCase
}