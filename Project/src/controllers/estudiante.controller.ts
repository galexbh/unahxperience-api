import {Application} from "express";
import { EstudianteService } from "../services/estudiante.service";

export class EstudianteController{
    private Est_Service: EstudianteService;
    constructor(private app: Application){
        this.Est_Service = new EstudianteService();
        this.routes();
    }
    private routes(){
        this.app.route("/estudiante/registro").post(this.Est_Service.newEstudiante);
        this.app.route("/estudiante/login").post(this.Est_Service.login);
        this.app.route("/estudiante").get(this.Est_Service.getAll);
        //Busca por nickName
        this.app.route("/estudiante/:nick")
        .get(this.Est_Service.getEstudiante)
        //Mandar id
        this.app.route("/estudiante/:id")
        .put(this.Est_Service.updateEstudiante) //requiere NickName para actualizar
        .delete(this.Est_Service.deleteOneEstudiante);
    }
}