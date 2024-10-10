import { IRoute } from "@/Proxy"



const ROUTES:IRoute[] = [
    {
        url:'/api/auth',
        proxy:{
            target:String(process.env.AUTH_TARGET),
            changeOrigin:true
        } 
    },
    {
        url:'/api/user',
        proxy:{
            target:String(process.env.USER_TARGET),
            changeOrigin:true
        } 
    },
    {
        url:'/api/property',
        proxy:{
            target:String(process.env.PROPERTY_TARGET),
            changeOrigin:true
        }
    },
    {
        url:'/api/booking',
        proxy:{
            target:String(process.env.BOOKING_TARGET),
            changeOrigin:true
        }
    },
    {
        url:'/api/chat',
        proxy:{
            target:String(process.env.CHAT_TARGET),
            changeOrigin:true
        }
    }

]

export {ROUTES}