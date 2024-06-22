
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { Router } from "express";
import {  isUserCheck, requireAdmin } from "topbeds-package"

export const routes = (dependencies: IDependencies) => {
    const {
        becomeHost,
        updateProfileImage,
        getAllUsers,
        updateUserStatus,
        getAllHosts,
        updateUserData,
        getAllUsersWithHostRequests,
        changeHostStatus
    } = controllers(dependencies)
    const router = Router()

    router.route('/become-host')
        .post(isUserCheck,becomeHost)
    router.route('/update-profile-image')
        .post(isUserCheck,updateProfileImage)  
    router.route('/get-all-users')
        .get(isUserCheck,requireAdmin, getAllUsers) 
    router.route('/status-update/:userId')
        .patch(isUserCheck,requireAdmin, updateUserStatus) 
    router.route('/get-all-hosts')
        .get(isUserCheck,requireAdmin,getAllHosts)    
    router.route('/update-user-data')
        .patch(isUserCheck,updateUserData)
    router.route('/get-all-users-with-host-status')
        .get(isUserCheck, getAllUsersWithHostRequests)   
    router.route('/change-host-status')
        .post(isUserCheck,changeHostStatus)
        
    return router
};




