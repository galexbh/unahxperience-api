import {Application} from "express";
import { DocenteService } from "../services/docente.service";

export class DocenteController{
    private Doct_Service: DocenteService;
    constructor(private app: Application){
        this.Doct_Service = new DocenteService();
        this.routes();
    }
    private routes(){
        this.app.route("/docente/registro").post(this.Doct_Service.NewDocente);
        
        //this.app.route("/docentes").get(this.Doct_Service.getALL);
    }
}