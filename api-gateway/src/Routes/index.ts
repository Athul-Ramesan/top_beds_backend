import { IRoute } from "@/Proxy"



const ROUTES:IRoute[] = [
    {
        url:'/api/auth',
        proxy:{
            target:'http://localhost:3000',
            changeOrigin:true
        } 
    },
    {
        url:'/api/user',
        proxy:{
            target:'http://localhost:3001',
            changeOrigin:true
        } 
    },
    {
        url:'/api/property',
        proxy:{
            target:'http://localhost:3002',
            changeOrigin:true
        }
    },
    {
        url:'/api/booking',
        proxy:{
            target:'http://localhost:3003',
            changeOrigin:true
        }
    },
    {
        url:'/api/booking',
        proxy:{
            target:'http://localhost:3004',
            changeOrigin:true
        }
    }

]

export {ROUTES}