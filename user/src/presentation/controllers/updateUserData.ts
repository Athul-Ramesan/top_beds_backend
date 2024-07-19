import { IDependencies } from "@/application/interfaces/IDependencies"
import { UserEntity } from "@/domain/entities/UserEntity"
import { becomeHostProducer } from "@/infrastructure/messages/kafka/producers/hostAddressAddedProducer"
import { updateUserProducer } from "@/infrastructure/messages/kafka/producers/updateUserProducer"
import { getTotalUsers } from "@/lib/getTotalUsers"
import { comparePassword } from "@/lib/services/comparePassword"
import { getUserDataById } from "@/lib/services/getUserData"
import { hashPassword } from "@/lib/services/hashPassword"
import { addressValidation } from "@/lib/validation/addressValidation"
import axios from "axios"
import { NextFunction, Request, Response } from "express"
import { customError } from "topbeds-package"


export const updateUserDataController = (
    dependencies: IDependencies
) => {
    const { useCases: { updateUserDataUseCase } } = dependencies
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let isMatch;
            console.log(req.body, 'req.body')

            const {
                oldPassword,
                newPassword,
                _id,
                firstName,
                lastName,
                phone
            } = req.body
            let password
            if (newPassword) {
                console.log("🚀 ~ newPassword:", newPassword)
                const user = await getUserDataById(_id)
                const existingPassword = String(user.password)
                console.log("🚀 ~ existingPassword:", existingPassword)

                if (oldPassword) {
                    console.log("🚀 ~ oldPassword:", oldPassword)

                    isMatch = await comparePassword(oldPassword, existingPassword)
                    console.log("🚀 ~ isMatch:", isMatch)
                    if (!isMatch) {
                        throw new customError("old password doesn't match", 400);
                    } else {
                        password = await hashPassword(newPassword)
                    }
                } else {
                    throw new customError("require existing password", 403);
                }
            }
            const payload: Partial<UserEntity> = {
                _id,
                // ...rest,
                ...(firstName && {firstName}),
                ...(lastName && {lastName}),
                ...(phone && {phone}),
                ...(password && { password })
            };
            console.log("🚀 ~ payload:", payload)

            const data = await updateUserDataUseCase(dependencies).execute(payload)
            console.log("🚀 ~ data:", data)

            if (!data) {
                throw new customError("Couldn't get properties", 404);
            }
            const response = await axios.post(`http://topbeds.smasher.shop/api/auth/update-user-data/${_id}`, {payload},
                {
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                console.log(response, 'update user data response')
            updateUserProducer(_id,payload)
            res.status(200).json({ status: "ok", updatedUserData:data, message: "user updated" })
        } catch (error: any) {
            console.log("🚀 ~ error:", error.message)
            next(error)
        }
    }
}

