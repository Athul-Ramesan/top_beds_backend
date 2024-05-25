import {  IChangeRoleUseCase } from "@/domain/IUseCases";
import { IDependencies } from "./IDependencies";
import { IAddAddressUseCase } from "@/domain/IUseCases/IAddaddress";

export interface IUseCases {
    changeRoleUseCase: (dependencies:IDependencies)=>IChangeRoleUseCase
    addAddressUseCase:(dependencies:IDependencies)=>IAddAddressUseCase
}