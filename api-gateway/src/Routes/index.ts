import { IRoute } from "@/Proxy"


const ROUTES:IRoute[] = [
    {
        url:'/auth',
        proxy:{
            target:'http://localhost:3000',
            changeOrigin:true
        } 
    },
    {
        url:'/user',
        proxy:{
            target:'http://localhost:3001',
            changeOrigin:true
        } 
    },
    {
        url:'/property',
        proxy:{
            target:'http://localhost:3002',
            changeOrigin:true
        }
    }

]

export {ROUTES}