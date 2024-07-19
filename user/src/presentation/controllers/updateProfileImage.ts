import { IDependencies } from "@/application/interfaces/IDependencies"
import { profileImageUpdatedProducer } from "@/infrastructure/messages/kafka/producers/profileImageUpdatedPoducer"
import { addressValidation } from "@/lib/validation/addressValidation"
import axios from "axios"
import { NextFunction, Request, Response } from "express"
import { NotFoundError, customError, uploadSingleImageToCloudinary } from "topbeds-package"


export const updateProfileImageController = (
    dependencies: IDependencies
) => {
    const { useCases: { updateProfileImageUseCase } } = dependencies
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const { _id, image } = req.body
        console.log("🚀 ~ _id:🔢🔢🔢🔢", _id)

        try {
            const imageUploadedToCloudinary = await uploadSingleImageToCloudinary(image)

            const result = await updateProfileImageUseCase(dependencies).execute(_id, imageUploadedToCloudinary)
            if (!result) {
                throw new NotFoundError()
            }

            profileImageUpdatedProducer(_id, imageUploadedToCloudinary)
            const payload = {
                profileImage: imageUploadedToCloudinary
            }
            const response = await axios.post(`http://topbeds.smasher.shop/api/auth/update-user-data/${_id}`, payload,
                {
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                console.log(response, 'update profile image response')
            const chatResponse = await axios.post(`http://topbeds.smasher.shop/api/chat/update-user-data/${_id}`, payload,
                {
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                console.log(chatResponse, 'update profile image response from chat' )
                
            res.status(200).json({ status: "ok", data: result, message: "Profile Image Updated" })
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ status: "error", message: error.message });
            } else if (error instanceof customError) {
                res.status(error.statusCode).json({ status: "error", message: error.message });
            } else {
                next(error);
            }
        }
    }
}

