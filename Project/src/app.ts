import express,{Application} from "express";
import {MainController} from "./controller/main.controller"
import bodyParse from "body-parser";
import cors from "cors";

class App{
    public app: Application;
    public mainController: MainController;
    constructor(){
        this.app = express();
        this.setConfig();
        this.mainController = new MainController(this.app);
    }
    private setConfig(){
        this.app.use(bodyParse.json({limit:"50mb"})); //Los objetos que vamos a estar enviando
        this.app.use(bodyParse.urlencoded({limit:"50mb", extended: true})); // body x-www-form-urlencoded | formularios
        this.app.use(cors());
    }
}

export default new App().app;