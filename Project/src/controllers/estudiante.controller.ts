import {Application} from "express";
import { EstudianteService } from "../services/estudiante.service";

export class EstudianteController{
    private Est_Service: EstudianteService;
    constructor(private app: Application){
        this.Est_Service = new EstudianteService();
        this.routes();
    }
    private routes(){
        this.app.route("/estudiante/registro").post(this.Est_Service.NewEstudiante);
        this.app.route("/estudiante/login").post(this.Est_Service.login);
        //this.app.route("/estudiantes").get(this.Est_Service.getALL);
    }
}