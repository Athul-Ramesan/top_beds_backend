
enum Role{
    user="user",
    host="host",
    admin="admin"
}
enum Gender{
    male="male",
    female="female",
    transgender="transgender"
}
export interface ISubscription {
        plan: string
        startDate: Date
        expiryDate: Date
        active: boolean,
        stripeSessionId: string
}

export interface UserEntity{
    _id?:string,
    firstName?:string,
    lastName?:string,
    username?:string,
    email?:string,
    password?:string,
    role?:Role,
    hostStatus?:string,
    gender?:Gender,
    isBlocked?:boolean,
    isGoogle?:boolean,
    profileImage?:string ,
    subscriptions?: ISubscription,
    resetPasswordToken?:string,
    resetPasswordExpires?:Date
}