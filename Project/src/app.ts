import express,{Application} from "express";
import {MainController} from "./controller/main.controller"
import bodyParse from "body-parser";
import cors from "cors";
import mongoose from "mongoose"

import {config} from "dotenv";
import {resolve} from "path";
config({path:resolve(__dirname,"../.env")});

class App{
    public app: Application;
    public mainController: MainController;
    constructor(){
        this.app = express();
        this.setConfig();
        this.setMongoDDConfig();
        this.mainController = new MainController(this.app);
    }
    private setConfig(){
        this.app.use(bodyParse.json({limit:"50mb"})); //Los objetos que vamos a estar enviando
        this.app.use(bodyParse.urlencoded({limit:"50mb", extended: true})); // body x-www-form-urlencoded | formularios
        this.app.use(cors());
    }
    private setMongoDDConfig(){
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGO_URI!,{ useNewUrlParser:true, useUnifiedTopology: true },(err: any)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Conexion exitosa");
            }  
        })
    }
}

export default new App().app;