import {Application} from "express";
import { DocenteService } from "../services/docente.service";

export class DocenteController{
    private Doct_Service: DocenteService;
    constructor(private app: Application){
        this.Doct_Service = new DocenteService();
        this.routes();
    }
    private routes(){
        this.app.route("/docente").post(this.Doct_Service.newOneDocente);
        this.app.route("/docente").get(this.Doct_Service.getAll);
        //Mandar ID 
        this.app.route("/docente/:id")
        .get(this.Doct_Service.getOneDocente)
        .put(this.Doct_Service.updateOneDocente)
        .delete(this.Doct_Service.deleteOneDocente);
    }
        
        
}