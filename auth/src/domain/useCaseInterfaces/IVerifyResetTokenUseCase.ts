
export interface IVerifyResetTokenUseCase{
    execute(token:string,password:string):Promise<Boolean|null>
}