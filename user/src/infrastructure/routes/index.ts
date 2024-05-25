
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { Router } from "express";
import { isUserCheck } from "topbeds-package"

export const routes = (dependencies: IDependencies) => {
    const {
        becomeHost
    } = controllers(dependencies)
    const router = Router()

    router.route('/become-host')
        .post(isUserCheck,becomeHost)
    return router
};




