import express,{Application} from "express";

import {CarreraController} from "./controllers/carrera.controller";
import {ComentarioController} from "./controllers/comentario.controller";
import {CursoController} from "./controllers/curso.controller";
import {DocenteController} from "./controllers/docente.controller";
import {EstudianteController} from "./controllers/estudiante.controller";
import {ForoController} from "./controllers/foro.controller";
import {MainController} from "./controllers/main.controller";
import {RateController} from "./controllers/rate.controller";
import {SolicitudController} from "./controllers/solicitud.controller";

import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });

class App{
    public app: Application;
    public mainController: MainController;
    public estudianteController: EstudianteController;
    public carreraController: CarreraController;
    public cursoController: CursoController;
    public comentarioController: ComentarioController;
    public foroController: ForoController;
    public rateController: RateController;
    public solicitudController: SolicitudController;
    public docenteController: DocenteController;
    constructor(){        
        this.app = express();
        
        this.setConfig();
        this.setMongoDBConfig();
        this.mainController = new MainController(this.app);
        this.comentarioController = new ComentarioController(this.app);        
        this.foroController = new ForoController(this.app);
        this.rateController = new RateController(this.app);
        this.solicitudController = new SolicitudController(this.app);
        this.docenteController = new DocenteController(this.app);
        this.carreraController = new CarreraController(this.app);
        this.estudianteController = new EstudianteController(this.app);
        this.cursoController = new CursoController(this.app);
    }
    private setConfig(){
        this.app.use(bodyParser.json({limit:"50mb"}));
        this.app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));
        this.app.use(cors());        
    }
    private setMongoDBConfig(){
        mongoose.Promise = global.Promise;
        
        mongoose.connect(process.env.MONGO_URI!,{ useNewUrlParser:true, useUnifiedTopology: true }, (err:any)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Conexion exitosa");
            }
        });
    }
}

export default new App().app;