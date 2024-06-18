

import { resetPasswordRepository } from "@/infrastructure/dataBase/repositories";
import { UserEntity } from "../../../../domain/entities/UserEntity";

export default async (
    _id:string,
    password:string
) => {
    try {

        console.log("==========");
        await resetPasswordRepository(_id,password);

        console.log("reset-password-consumed");
        console.log("==========");

    } catch (error: any) {
        console.log("user-created-consumed error: ", error?.message);
    }

}

