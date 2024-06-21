import { Application } from "express";
import { Options, createProxyMiddleware } from "http-proxy-middleware";

interface ProxyConfig extends Options {
    target: string;
    changeOrigin: boolean;
  }
export interface IRoute {
    url:string,
    proxy:ProxyConfig
}

const setupProxies = (app:Application, routes:IRoute[])=>{
    console.log("👉 inside setup proxies");
    routes.forEach(r=>{
        console.log(r);
        app.use(r.url,createProxyMiddleware(r.proxy))
        
    })
}


export {setupProxies}