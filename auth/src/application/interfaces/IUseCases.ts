import { IEmailVerificationUseCase, IGetUserDataUseCase, ILoginUseCase, ISignupUseCase, IVerifyAccountUseCase, IVerifyResetTokenUseCase } from "../../domain/useCaseInterfaces";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    signupUseCase: (dependencies: IDependencies)=>ISignupUseCase;
    loginUseCase: (dependencies: IDependencies) => ILoginUseCase;
    googleSingupOrLoginUseCase: (dependencies:IDependencies)=>ISignupUseCase;
    sendOtpUseCase:(dependencies:IDependencies)=>IVerifyAccountUseCase;
    verifyOtpUseCase:(dependencies:IDependencies)=> IVerifyAccountUseCase;
    getUserDataUseCase: (dependencies:IDependencies)=>IGetUserDataUseCase;
    emailVerificationUseCase : (dependencies:IDependencies) =>IEmailVerificationUseCase;
    verifyResetTokenUseCase : ( dependencies:IDependencies) => IVerifyResetTokenUseCase
}