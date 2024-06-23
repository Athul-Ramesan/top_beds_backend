import { Application } from "express";
import { Options, createProxyMiddleware } from "http-proxy-middleware";

interface ProxyConfig extends Options {
    target: string;
    changeOrigin: boolean;
    timeout: number;
    keepAlive:boolean
  }
export interface IRoute {
    url:string,
    proxy:ProxyConfig
}

const setupProxies = (app:Application, routes:IRoute[])=>{
   try {
    console.log("👉 inside setup proxies");
    routes.forEach(r=>{
        console.log(r);
        app.use(r.url,createProxyMiddleware(r.proxy))
    })
   } catch (error:any) {
    console.log("🚀 ~ setupProxies ~ error:", error)
    
   }
}



export {setupProxies}