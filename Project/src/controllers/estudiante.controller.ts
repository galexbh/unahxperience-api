import {Application} from "express";
import { EstudianteService } from "../services/estudiante.service";

export class EstudianteController{
    private Est_Service: EstudianteService;
    constructor(private app: Application){
        this.Est_Service = new EstudianteService();
        this.routes();
    }
    private routes(){
        this.app.route("/estudiante").post(this.Est_Service.NuevoEstudiante);
        this.app.route("/estudiantec").get(this.Est_Service.getALL);
    }
}