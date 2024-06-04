

export interface IDeletePropertyUseCase{
    execute(data:string):Promise<Boolean | null>
}