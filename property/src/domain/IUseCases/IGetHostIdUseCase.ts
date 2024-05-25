
export interface IGetHostIdUseCase {
    execute(data:string):Promise<string | null>
}