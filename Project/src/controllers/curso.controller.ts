import {Application} from "express";
import { CursoService } from "../services/curso.service";

export class CursoController{
    private Curs_Service: CursoService;
    constructor(private app: Application){
        this.Curs_Service = new CursoService();
        this.routes();
    }
    private routes(){
        this.app.route("/curso/registro").post(this.Curs_Service.NewCurso);
        
        //this.app.route("/docentes").get(this.Doct_Service.getALL);
    }
}