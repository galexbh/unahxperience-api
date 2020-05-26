import {Application} from "express";
import { CursoService } from "../services/curso.service";

export class CursoController{
    private Curs_Service: CursoService;
    constructor(private app: Application){
        this.Curs_Service = new CursoService();
        this.routes();
    }
    private routes(){
        this.app.route("/curso").post(this.Curs_Service.newOneCurso);
        this.app.route("/curso").get(this.Curs_Service.getAll);
        //Mandar ID 
        this.app.route("/curso/:id")
        .get(this.Curs_Service.getCurso)
        .put(this.Curs_Service.updateOneCurso)
        .delete(this.Curs_Service.deleteOneCurso);
    }
}