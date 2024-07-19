import { NextFunction, Request, Response } from "express";
import { updateUserData } from "../../_lib/services/updateUserData";
import { NotFoundError } from "topbeds-package";
export const updateUserDataController =async (req: Request, res: Response, next: NextFunction)  => {
    try {
        const { payload } = req.body;
        const _id = req.params._id;
    
        console.log("🚀 ~ updateUserDataController ~ payload:", payload);
        console.log("🚀 ~ updateUserDataController ~ _id:", _id);
    
        const user = await updateUserData(_id, payload);
        res.status(200).json({ status: 'ok', data: user });
      } catch (error: any) {
        console.error(error);
        if (error instanceof NotFoundError) {
          res.status(404).json({ status: false, message: "User not found" });
        } else {
          res.status(400).json({ status: false, message: error.message });
        }
      }
    
}