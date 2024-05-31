
export interface IEmailVerificationUseCase {
    
    execute(email:string): Promise<boolean | null>
}