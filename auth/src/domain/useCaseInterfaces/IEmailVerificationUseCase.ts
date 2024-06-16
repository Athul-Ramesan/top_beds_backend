
export interface IEmailVerificationUseCase {
    execute(email:string): Promise<Boolean | null>
}
