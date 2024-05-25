import { UserEntity } from "../../../../domain/entities/UserEntity";
import { createUser } from "../../../dataBase/repositories/createUser";

export default async (
    data: UserEntity
) => {
    try {

        console.log("==========");
        await createUser(data);

        console.log("user-created-consumed");
        console.log("==========");

    } catch (error: any) {
        console.log("user-created-consumed error: ", error?.message);
    }

}
