import {  IChangeRoleUseCase } from "@/domain/IUseCases";
import { IDependencies } from "./IDependencies";
import { IAddAddressUseCase } from "@/domain/IUseCases/IAddaddress";
import { IUpdadateProfileImageUseCase } from "@/domain/IUseCases/IUpdateProfileImage";
import { IGetAllUsersUseCase } from "@/domain/IUseCases/IGetAllUsers";

export interface IUseCases {
    changeRoleUseCase: (dependencies:IDependencies)=>IChangeRoleUseCase
    addAddressUseCase:(dependencies:IDependencies)=>IAddAddressUseCase
    updateProfileImageUseCase:(dependencies:IDependencies)=>IUpdadateProfileImageUseCase
    getAllUsersUseCase: (dependencies:IDependencies)=>IGetAllUsersUseCase
}