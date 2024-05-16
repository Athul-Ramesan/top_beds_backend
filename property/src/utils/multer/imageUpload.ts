import { Request } from "express"
import multer ,{FileFilterCallback} from "multer"

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
    destination:(
        request:Request,
        file: Express.Multer.File,
        callback:DestinationCallback
    ): void=> {
        callback(null,'uploads/')
    },
    filename:(
        request:Request,
        file:Express.Multer.File,
        callback:FileNameCallback
    ):void=>{
        callback(null,file.fieldname+"-"+Date.now())
    }
})

export const upload = multer({
    storage:fileStorage
})