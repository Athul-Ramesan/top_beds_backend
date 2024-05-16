import { ICreatePropertyUseCase, IGetAllPropertyUseCase } from "@/domain/IUseCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    createPropertyUseCase:(dependencies:IDependencies)
    =>ICreatePropertyUseCase;

    getAllPropertyUseCase:(dependencies:IDependencies)=>IGetAllPropertyUseCase;
}